// todo: fix me!
const t_student = require('../models/t_student');
const moment = require('moment');

exports.findAll = async function (req, res) {
  const model_student = t_student();
  let filter = {};

  if (!!req.query.class) {
    filter.class_id = req.query.class;
  }

  var data = await model_student.findAll({
    where: filter
  });

  res.json({ data: data });
};

exports.findOne = async function (req, res) {
  const model_student = t_student();
  var datum = await model_student.findOne({
    where: { subject_id: req.params.id }
  });

  res.json({ data: datum });
};

exports.create = async function (req, res) {
  const model_student = t_student();
  var new_obj = {
    student_no: req.body.student_no,
    student_name: req.body.student_name,
    sex: req.body.sex,
    class_id: req.body.class_id,
    student_no: req.body.student_no,
    status: 1,
    created_date: moment().format(),
    created_by: req.user.user_name
  };
  try {
    var datum = await model_student.create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};
