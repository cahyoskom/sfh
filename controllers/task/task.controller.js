const t_task = require('../../models/t_task');
const t_task_file = require('../../models/t_task_file');
const t_task_collection = require('../../models/t_task_collection');
const moment = require('moment');
const fs = require('fs');
const { sha256 } = require('../../common/sha');
const {FILE_UPLOAD_DIR} = require('../../config/app.config');
const formidable =require('formidable');
const MoveFile = require('../../common/move');
const {query} = require('../../models/query');
const TASK_STATUS = require('../../enums/status.enums');

module.exports = function (router) {

    router.get('/', async function (req, res) {
        var filter = {};
        var where = [];

        if (!!req.query.class) {
            filter.class_id = req.query.class;
            where.push('c.class_id IN (:class_id)');
        }

        if (!!req.query.subject) {
            filter.subject_id= req.query.subject;
            where.push('s.subject_id IN (:subject_id)');
        }

        var sql = `
            SELECT t.assignor_id, t.task_id, title, notes, weight, start_date, finish_date, publish_date,
                    s.subject_id, subject_name, c.class_id, class_level, class_parallel,class_name
            FROM t_task t
            JOIN m_subject s ON s.subject_id=t.subject_id
            JOIN m_class c ON c.class_id=t.class_id
            WHERE t.status = 1 AND s.status=1 AND c.status = 1
        `;

        if (Object.keys(filter).length > 0) {
            sql = sql + " AND " + where.join(' AND ');
        }

        var data = await query(sql, filter);

        res.json({ data : data});
    });

    router.get('/:id', async function (req, res) {
        const model_task = t_task();
        var datum = await model_task.findOne({ where : {task_id: req.params.id}});
        var files = await t_task_file().findAll({where : {task_id : req.params.id}});
        var result = datum.toJSON();
        result.files = files;
        res.json({ data : result});
    });

    router.get('/:id/collection', async function (req, res) {
        const model_task = t_task();
        var task = await model_task.findOne({ where : {task_id: req.params.id}});

        if (!task) {
            res.status(411).json({error: 11, message: "Id needed."});
            return;
        }

        var sql = `
            SELECT
                s.student_no, s.student_name, c.task_collection_id,submitted_date, c.status
            FROM (SELECT * from t_student WHERE class_id = :class_id AND status=1) s
            LEFT JOIN (SELECT * FROM t_task_collection WHERE task_id = :task_id) c ON c.student_id=s.student_id
        `;

        var data = await query(sql, {class_id : task.class_id, task_id : task.task_id});


        res.json({ data : data});
    });

    router.put('/', async function (req, res) {
        const model_task = t_task();
        var new_obj = {
            assignor_id: req.body.assignor_id,
            class_id : req.body.class_id,
            subject_id : req.body.subject_id,
            title : req.body.title,
            notes : req.body.notes,
            weight : req.body.weight,
            start_date : req.body.start_date,
            finish_date : req.body.finish_date,
            publish_date : req.body.publish_date,
            status: 1,
            created_date : moment().format(),
            created_by : req.user.user_name
        }
        try {
            var datum = await model_task.create(new_obj);
            res.json({data: datum});
        } catch(err) {
            res.status(411).json({error: 11, message: err.message})
        }
    });

    router.post('/', async function (req, res) {
        const model_task = t_task();
        var update_obj = {
            assignor_id: req.body.assignor_id,
            class_id : req.body.class_id,
            subject_id : req.body.subject_id,
            title : req.body.title,
            notes : req.body.notes,
            weight : req.body.weight,
            start_date : req.body.start_date,
            finish_date : req.body.finish_date,
            publish_date : req.body.publish_date,
            status: TASK_STATUS.ACTIVE,
            updated_date : moment().format(),
            updated_by : req.user.user_name
        }
        try {
            var datum = await model_task.update(update_obj, {where : {task_id : req.body.task_id }});
            res.json({message: "Data has been updated."});
        } catch(err) {
            res.status(411).json({error: 11, message: err.message})
        }
    });

    router.post('/:status', async function (req, res) {
        var id = req.body.task_id;
        if (!id) {
            res.status(411).json({error: 11, message: "Id needed."});
            return;
        }

        let update_obj = {};
        let status = TASK_STATUS.ACTIVE;

        switch (req.params.status) {
            case 'archived' : status = 5; break;
            case 'published' : status = 2; break;
            case 'finished' : status = 3; break;
            default : status = 0;
        }

        if (status === 0) {
            res.status(411).json({error: 11, message: "Status out of range."});
            return;
        }

        update_obj = {
            status : status,
            updated_date : moment().format(),
            updated_by : req.user.user_name
        }

        try {
            var datum = await t_task().update(update_obj, {where : {task_id : req.body.task_id }});
            res.json({message: "Data has been updated."});
        } catch(err) {
            res.status(411).json({error: 11, message: err.message})
        }

    });

    router.put('/:id/files', async function(req, res) {
        const form = formidable({ multiples: true });
        const task_id = req.params.id;

        var task = await t_task().findOne({ where : {task_id: req.params.id}});
        let result = [];
        if (!task) {
            res.status(404).json({error: 31, message: 'Task not found.'})
            return;
        }

        let {fields, files} = await new Promise(function (resolve, reject) {
            form.parse(req, function (err, fields, files) {
                if (err) {
                    reject(err)
                    return;
                }
                if (!Array.isArray(files.files)) {
                    resolve( { fields, files: [files.files] });
                }else {
                    resolve( { fields, files: files.files });
                }
            });
        });

       if (files.length == 0) {
            res.status(421).json({error: 21, message: "Files not found"});
        }

        var upload_dir = FILE_UPLOAD_DIR + "/task_" + task_id + "/";
        if (!fs.existsSync(upload_dir)){
            fs.mkdirSync(upload_dir);
        }        
        for (const element of files) {
            let filename = upload_dir + element.name;
            await MoveFile(element.path, filename);
            let new_file = {
                task_id : task_id,
                filename : element.name,
                ext : filename.split('.').pop(),
                mime_type : element.type,
                location: filename,
                sequence : 0, //todo ambil dari terakhir
                status: 1,
                created_date : moment().format(),
                created_by : req.user.user_name
                };
            
            var task_file = await t_task_file().findOne({where : {task_id: task_id, filename : element.name}});
            if (!task_file) { // belum ada, insert baru
                task_file = await t_task_file().create(new_file);
            } else {
                // todo, update ganti updated date
            }

            result.push(task_file);
        };

        res.json( {data : result });
    });

    router.delete('/:id', async function (req, res) {
        const model_task = t_task();
        model_task.update(
            { status : TASK_STATUS.DELETED},
            {where : {task_id : req.params.id}});

        res.json({message : 'Data has been deleted.'});

    });

    router.delete('/:id/files/:file_id', async function (req, res) {
        const model_task = t_task_file();
        model_task.update(
            { status : TASK_STATUS.DELETED},
            {where : {task_file_id : req.params.file_id}});

        res.json({message : 'Data has been deleted.'});

    });

    router.get('/download/:file_id', async function (req, res) {
        var file = await t_task_file().findOne({ where : { task_file_id : req.params.file_id}});

        if (!!file) {
            var task_id = file.task_id;
            var upload_dir = FILE_UPLOAD_DIR + "/task_" + task_id + "/";
            var filename = upload_dir + file.filename;
            if (!fs.existsSync(filename)){
                res.status(404).json({error: 24, message: "File is missing. It shoud existed though."});
                return;
            }
            res.download(filename);

        } else {
            res.status(404).json({error: 24, message: "File not found"});
        }
    });

};