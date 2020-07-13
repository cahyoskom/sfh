const sec_group = require('../models/sec_group');
const moment = require('moment');

exports.findAll = async function (req, res) {
  const model_group = sec_group();
  var data = await model_group.findAll();

  res.json({ data: data });
};

exports.findOne = async function (req, res) {
  const model_group = sec_group();
  var datum = await model_group.findOne({
    where: { group_id: req.params.id }
  });

  res.json({ data: datum });
};

exports.create = async function (req, res) {
  const model_group = sec_group();
  var new_obj = {
    group_name: req.body.group_name,
    status: 1,
    created_date: moment().format(),
    created_by: req.user.user_name
  };
  try {
    var datum = await model_group.create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};
