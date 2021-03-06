const t_class_todo_detail = require('../models/t_class_todo_detail');
const t_class_todo = require('../models/t_class_todo');
const m_recurrent = require('../models/m_recurrent');
const moment = require('moment');
const { Op } = require('sequelize');
const { query } = require('express');
const { ACTIVE, DELETED, DEACTIVE } = require('../enums/status.enums');

exports.findAll = async function (req, res) {
  const model_todo = t_class_todo_detail();

  console.log('startDate === ' + moment(req.query.startDate).format());
  console.log('endDate === ' + moment(req.query.endDate).format());
  const q_type = req.query.type;
  const q_status = ACTIVE;
  const q_startDate = req.query.startDate;
  const q_endDate = req.query.endDate;

  // if (q_type || q_status || q_start_date || q_end_date) {
  //   var data = await model_todo.findAndCountAll({
  //   });

  if (q_status) {
    var data = await model_todo.findAndCountAll({
      where: {
        [Op.and]: [{ status: { [Op.like]: q_status } }]
      }
    });
  } else if (q_startDate && q_endDate) {
    var data = await model_todo.findAndCountAll({
      where: {
        todo_date: {
          [Op.between]: [moment(q_startDate).add(1, 'day'), moment(q_endDate).add(1, 'day')]
        }
      }
    });
  }

  console.log('Test Todo');

  res.json({ data: data });
};

exports.delete = async function (req, res) {
  const model_todo = t_class_todo();
  const model_detail = t_class_todo_detail();

  model_todo.update({ status: DELETED }, { where: { id: req.params.id } });
  model_detail.update({ status: DELETED }, { where: { id: req.params.id } });
  res.json({ message: 'Data has been deleted.' });
};

exports.create = async (req, res) => {
  const model_todo = t_class_todo();
  const model_detail = t_class_todo_detail();

  var todo_id;
  var existed_todo = await model_todo.findOne({
    where: { name: req.body.name, t_class_id: req.body.t_class_id, status: ACTIVE }
  });
  if (existed_todo) {
    //subject already existed
    todo_id = existed_todo.id;
  } else {
    var new_post = {
      name: req.body.name,
      m_recurrent_id: req.body.m_recurrent_id,
      t_class_id: req.body.t_class_id,
      subscriber: req.body.subscriber,
      sec_user_id: req.user.id,
      start_datetime: req.body.start_datetime,
      end_datetime: req.body.end_datetime,
      status: ACTIVE,
      created_date: moment().format(),
      created_by: req.user.name
    };
    var data = await model_todo.create(new_post);
    todo_id = data.id;
  }
  console.log(req.body);
  console.log(new_post);

  var new_todo = {
    t_class_todo_id: todo_id,
    m_answer_type_id: req.body.m_answer_type_id,
    type: req.body.type,
    content: req.body.content,
    valid_answer: req.body.valid_answer,
    content: req.body.content,
    is_recurrent: req.body.is_recurrent,
    todo_date: req.body.todo_date,
    status: 1,
    created_date: moment().format(),
    created_by: req.user.name
  };

  try {
    var data = await model_detail.create(new_todo);
    res.json({ data: data });
  } catch (err) {
    res.status(411).json({ error: 0, message: err.message });
  }
};

exports.update = async function (req, res) {
  const model_todo = t_class_todo();
  const model_detail = t_class_todo_detail();
  var todo_id;
  var existed_todo = await model_todo.findOne({
    where: { name: req.body.name, t_class_id: req.body.t_class_id, status: ACTIVE }
  });
  if (existed_todo) {
    //subject already existed {moment(row.todo_date).format(' D MMMM YYYY - ')}
    todo_id = existed_todo.id;
  } else {
    var new_post = {
      name: req.body.name,
      t_class_id: req.body.t_class_id,
      sec_user_id: req.body.sec_user_id,
      m_recurrent_id: req.body.m_recurrent_id,
      start_datetime: req.body.start_datetime,
      end_datetime: req.body.end_datetime.format('D MMMM YYYY'),
      status: ACTIVE,
      created_date: moment().format(),
      created_by: req.user.name
    };

    try {
      var datum = await model_todo.create(new_post);
      todo_id = datum.id;
    } catch (err) {
      res.status(411).json({ error: 11, message: err.message });
    }
  }
  var update_obj = {
    t_class_todo_id: todo_id,
    m_answer_type_id: req.body.m_answer_type_id,
    type: req.body.type,
    content: req.body.content,
    valid_answer: req.body.valid_answer,
    content: req.body.content,
    is_recurrent: req.body.is_recurrent,
    todo_date: req.body.todo_date,
    status: 1,
    created_date: moment().format(),
    created_by: req.user.name
  };

  console.log(update_obj);
  try {
    var datum = await model_detail.update(update_obj, {
      where: { id: req.body.id }
    });
    res.json({ message: 'Data has been updated.' });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};
