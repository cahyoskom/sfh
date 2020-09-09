const t_class_todo_detail = require('../models/t_class_todo_detail');
const t_class_todo = require('../models/t_class_todo');
const moment = require('moment');

const { ACTIVE, DELETED, DEACTIVE } = require('../enums/todo_status.enums');

exports.findAll = async function (req, res) {
  const model_todo = t_class_todo_detail();


  var data = await model_todo.findAndCountAll({
    where: {
      status: ACTIVE,
      type: req.query.type,
      // id: req.query.id
    }
  });


  console.log('Test Todo');

  res.json({ data: data });
};


exports.delete = async function (req, res) {
  const model_todo = t_class_todo();
  const model_detail = t_class_todo_detail();

  model_todo.update({ status: DELETED }, { where: { id: req.params.id } });
  model_detail.update({ status: DELETED }, { where: { id: req.params.id } });
  res.json({ message: 'Data has been deleted.' })
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
      t_class_id: req.body.t_class_id,
      m_recurrent_id: req.body.m_recurrent_id,
      subscriber: req.body.subscriber,
      sec_user_id: req.user.id,
      start_datetime: moment().format(),
      end_datetime: req.body.end_datetime,
      status: ACTIVE,
      created_date: moment().format(),
      created_by: req.user.name
    };
    var data = await model_todo.create(new_post);
    todo_id = data.id;

  }
  console.log(req.body)
  console.log(new_post)

  var new_todo = {
    t_class_todo_id: todo_id,
    m_answer_type_id: req.body.m_answer_type_id,
    type: req.body.type,
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
    //subject already existed
    todo_id = existed_todo.id;
  } else {
    var new_post = {
      name: req.body.name,
      t_class_id: req.body.t_class_id,
      sec_user_id: req.body.sec_user_id,
      m_recurrent_id: req.body.m_recurrent_id,
      start_datetime: req.body.start_datetime,
      end_datetime: req.body.end_datetime,
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





