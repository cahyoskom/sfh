const t_task = require('../../models/t_task');
const t_task_file = require('../../models/t_task_file');
const t_task_collection = require('../../models/t_task_collection');
const t_task_collection_file = require('../../models/t_task_collection_file');
const query = require('../../models/query');
const moment = require('moment');
const fs = require('fs');
const { sha256 } = require('../../common/sha');
const {FILE_UPLOAD_DIR} = require('../../config/app.config');
const formidable =require('formidable');


module.exports = function (router) {

    router.get('/', async function (req, res) {
        var filter = {};

        if (!!req.query.class) {
            filter.class_id= req.query.class;
        }

        var sql = `SELECT r.group_id, group_name, r.class_id, class_name, 
                            r.subject_id, subject_name,
                            r.student_id, student_name
                    FROM t_task t
                    LEFT JOIN t_task_file tf ON t.task_id=tf.task_id
                    LEFT JOIN t_task_collection tc ON tc.task_id=t.task_id
                    LEFT JOIN t_task_collection_file tcf ON tcf.task_collection_id=t.task_collection_id
                    WHERE t.class_id = :class_id AND 
                    `;
        var param = { user_id : user_id};

        const model_task = t_task();
        var data = await model_task.findAll(
            {
                where : filter
            }
        );

        res.json({ data : data});
    });

    router.get('/:id', async function (req, res) {
        const model_task = t_task();
        var datum = await model_task.findOne({ where : {task_id: req.params.id}});
        var files = await t_task_file().findAll({where : {task_id : req.params.id}});
        datum.files = files;
        res.json({ data : datum});
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
            await move_file(element.path, filename);
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

    async function move_file(oldpath, newpath) {
        fs.readFile(oldpath, function (err, data) {
            if (err) throw err;
            // console.log('File read!');

            // Write the file
            fs.writeFile(newpath, data, function (err) {
                if (err) throw err;
                // console.log('File written!');
            });

            // Delete the file
            fs.unlink(oldpath, function (err) {
                if (err) throw err;
                // console.log('File deleted!');
            });
        });        
    }

};