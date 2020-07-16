const m_class = require('../models/m_class');
const { sha256 } = require('../common/sha');
const query = require('../models/query');
const { Op } = require('sequelize');
const moment = require('moment');
var config = require('../config/app.config');
const CLASS_STATUS = require('../enums/status.enums');

exports.findAll = async function (req, res) {
  const model_class = m_class();
  var data = await model_class.findAll();

  res.json({ data: data });
};

exports.findOne = async function (req, res) {
  const model_class = m_class();
  var datum = await model_class.findOne({
    where: { id: req.params.id }
  });

  res.json({ data: datum });
};

exports.create = async function (req, res) {
  const model_class = m_class();
  var new_obj = {
    m_school_id: req.body.m_school_id,
    code: req.body.code,
    name: req.body.name,
    description: req.body.description,
    status: 1,
    created_date: moment().format(),
    created_by: req.body.name
  };
  try {
    var datum = await model_class.create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.update = async function (req, res) {
  const model_class = m_class();
  var update_obj = {
    m_school_id: req.body.m_school_id,
    code: req.body.code,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    updated_date: moment().format(),
    updated_by: req.body.name
  };
  try {
    var datum = await model_class.update(update_obj, {
      where: { id: req.params.id }
    });
    res.json({ message: 'Data has been updated.' });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.delete = async function (req, res) {
  const model_class = m_class();
  model_class.update(
    { status: CLASS_STATUS.DELETED },{ where: { id: req.params.id } }
    
  );

  res.json({ message: 'Data has been deleted.' });
};
