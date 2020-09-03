const t_class_subject = require('../models/t_class_subject');
const moment = require('moment');

exports.findAll = async function (req, res) {
  const model_subject = t_class_subject();
  var data = await model_subject.findAll();

  res.json({ data: data });
};

exports.findOne = async function (req, res) {
  const model_subject = t_class_subject();
  var datum = await model_subject.findOne({
    where: { subject_id: req.params.id }
  });

  res.json({ data: datum });
};

exports.create = async function (req, res) {
  const model_subject = t_class_subject();
  var new_obj = {
    subject_name: req.body.subject_name,
    status: 1,
    created_date: moment().format(),
    created_by: req.user.user_name
  };
  try {
    var datum = await model_subject.create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};
