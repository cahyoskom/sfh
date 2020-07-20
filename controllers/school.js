
const { sha256 } = require('../common/sha');
const query = require('../models/query');
const { Op } = require('sequelize');
const moment = require('moment');
var config = require('../config/app.config');
const m_school = require('../models/m_school');
const m_class = require('../models/m_class');
// const m_subject = require('../models/m_subject');
const SCHOOL_STATUS = require('../enums/status.enums');
const CLASS_STATUS = require('../enums/status.enums');
// const SUBJECT_STATUS = require('../enums/status.enums');

exports.findAll = async function (req, res) {
  const model_school = m_school();
  var data = await model_school.findAll();

  res.json({ data: data });
};

exports.findOne = async function (req, res) {
  const model_school = m_school();
  var datum = await model_school.findOne({
    where: { id: req.params.id }
  });

  res.json({ data: datum });
};

exports.create = async function (req, res) {
  const model_school = m_school();
  var new_obj = {
    m_school_id: req.body.m_school_id,
    code: req.body.code,
    name: req.body.name,
    address: req.body.address,
    zipcode: req.body.zipcode,
    phone: req.body.phone,
    avatar: req.body.avatar,
    status: 1,
    created_date: moment().format(),
    created_by: req.body.name
  };
  try {
    var datum = await model_school.create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.update = async function (req, res) {
  const model_school = m_school();
  var update_obj = {
    m_school_id: req.body.m_school_id,
    code: req.body.code,
    name: req.body.name,
    address: req.body.address,
    zipcode: req.body.zipcode,
    phone: req.body.phone,
    avatar: req.body.avatar,
    status: SCHOOL_STATUS.ACTIVE,
    updated_date: moment().format(),
    updated_by: req.body.name
  };
  try {
    var datum = await model_school.update(update_obj, {
      where: { id: req.params.id }
    });
    res.json({ message: 'Data has been updated.' });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.delete = async function (req, res) {
  const model_school = m_school();
  const model_class = m_class();
  // const model_subject = m_subject();
  model_school.update(
    { status: SCHOOL_STATUS.DELETED },{ where: { id: req.params.id } }
  );

  model_class.update(
    { status: CLASS_STATUS.DELETED },{ where: { m_school_id: req.body.m_school_id } }
  );

  // model_subject.update(
  //   { status: SUBJECT_STATUS.DELETED },{ where: { m_class_id: req.body.m_class_id } }
  // );


  res.json({ message: 'Data has been deleted.' });
};
