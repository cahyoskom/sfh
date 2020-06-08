const t_task_collection = require('../../models/t_task_collection');
const t_task_collection_file = require('../../models/t_task_collection_file');
const fs = require('fs');
const {query} = require('../../models/query');
const TASK_STATUS = require('../../enums/status.enums');
const moment = require('moment');
const {FILE_UPLOAD_DIR} = require('../../config/app.config');
const formidable =require('formidable');
const GROUP_ENUMS = require('../../enums/group.enums');
const MoveFile = require('../../common/move');

module.exports = function (router) {

    router.get('/', async function (req, res) {
        var filter = {};

        if (!!req.user.roles[GROUP_ENUMS.STUDENT]) {
            // student
            var cols = await GetCollectionForStudent(req.user.roles[GROUP_ENUMS.STUDENT][0]);
        } else {
            // not student
            if (!!req.query.class) {
                filter.class_id= req.query.class;
            }
    
        }
        res.json({ data : cols});
    });

    router.get('/:id', async function (req, res) {
        const model_task = t_task_collection();
        var datum = await model_task.findOne({ where : {task_collection_id: req.params.id}});
        var files = await t_task_collection_file().findAll({where : {task_collection_id : req.params.id}});
        var result = datum.toJSON();
        result.files = files;
        res.json({ data : result});
    });

    router.put('/', async function (req, res) {
        if (!req.user.roles[GROUP_ENUMS.STUDENT]) {
            res.status(401).json({error: 10, message: 'Not a student'});
            return;
        }
        var new_obj = {
            task_id: req.body.task_id,
            student_id : req.user.roles[GROUP_ENUMS.STUDENT][0].student_id,
            status: 1,
            created_date : moment().format(),
            created_by : req.user.user_name
        }
        try {
            var datum = await t_task_collection().create(new_obj);
            res.json({data: datum});
        } catch(err) {
            res.status(411).json({error: 11, message: err.message})
        }
    });

    router.post('/:status', async function (req, res) {
        let new_status = 1;
        if (req.params.status == 'submit') {
            status = 4;
        }
        var update_obj = {
            status: status,
            updated_date : moment().format(),
            updated_by : req.user.user_name
        }
        try {
            var datum = await t_task_collection().update(update_obj, {where : {task_collection_id : req.body.task_collection_id }});
            res.json({message: "Data has been updated."});
        } catch(err) {
            res.status(411).json({error: 11, message: err.message})
        }
    });


    
    router.put('/:id/files', async function(req, res) {
        const form = formidable({ multiples: true });
        const task_collection_id = req.params.id;

        var task_collection = await t_task_collection().findOne({ where : {task_collection_id: req.params.id}});
        let result = [];
        if (!task_collection) {
            res.status(404).json({error: 31, message: 'Task Collection not found.'})
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


        let task_id = task_collection.task_id;
        var upload_dir = FILE_UPLOAD_DIR + "/task_" + task_id + "/collection/" + task_collection_id;
        if (!fs.existsSync(upload_dir)){
            fs.mkdirSync(upload_dir, { recursive: true });
        }        
        for (const element of files) {
            let filename = upload_dir + element.name;
            await MoveFile(element.path, filename);
            let new_file = {
                task_collection_id : task_collection_id,
                filename : element.name,
                ext : filename.split('.').pop(),
                mime_type : element.type,
                location: filename,
                sequence : 0, //todo ambil dari terakhir
                status: 1,
                created_date : moment().format(),
                created_by : req.user.user_name
                };
            
            var task_collection_file = await t_task_collection_file().findOne({where : {task_collection_id: task_collection_id, filename : element.name}});
            if (!task_collection_file) { // belum ada, insert baru
                task_collection_file = await t_task_collection_file().create(new_file);
            } else {
                // todo, update ganti updated date
            }

            result.push(task_collection_file);
        };

        res.json( {data : result });
    });

    async function GetCollectionForStudent(student) {
        var sql = `SELECT t.task_id, t.title, notes, start_date, finish_date, 
                        s.subject_name,
                        COALESCE(tc.task_collection_id, 0) AS task_collection_id, 
                        COALESCE(tc.status,0) AS collection_status
                    FROM t_task t
                    JOIN m_subject s ON s.subject_id=t.subject_id
                    LEFT JOIN (SELECT * FROM t_task_collection WHERE student_id = :student_id) tc ON tc.task_id=t.task_id
                    WHERE t.class_id = :class_id AND t.status=1 AND s.status = 1
                    `;
        var param = { class_id : student.student_class_id, student_id : student.student_id };

        return await query(sql, param);

    };


};