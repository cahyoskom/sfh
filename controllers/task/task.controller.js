const t_task = require('../../models/t_task');
const { sha256 } = require('../../helpers/sha');
const query = require('../../models/query');
const {Op} = require('sequelize');
const moment = require('moment');
var config = require('../../config/app.config');


module.exports = function (router) {

    router.get('/', async function (req, res) {
        var filter = {};

        if (!!req.query.class) {
            filter.class_id= req.query.class;
        }

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
            created_by : 'temp'
        }
        try {
            var datum = await model_task.create(new_obj);
            res.json({data: datum});
        } catch(err) {
            res.status(411).json({error: 11, message: err.message})
        }
    });
};