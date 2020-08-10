const m_class = require('../models/m_class');
const m_class_member = require('../models/m_class_member');
const m_subject = require('../models/m_subject');
const t_task = require('../models/t_task');
const t_task_file = require('../models/t_task_file');
const t_task_collection = require('../models/t_task_collection');
const t_task_collection_file = require('../models/t_task_collection_file');
const { sha256 } = require('../common/sha');
const query = require('../models/query');
const { Op } = require('sequelize');
const moment = require('moment');
const { ACTIVE, DELETED } = require('../enums/status.enums');
const sequelize = require('sequelize');

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
  let transaction;
  try {
    const model_class = m_class();
    const classId = req.params.id;
    await model_class.update(
      {
        status: DELETED
      },
      { where: { id: classId }, transaction }
    );

    const model_class_member = m_class_member();
    const classmemberFilter = {
      m_class_id: classId
    };
    await model_class_member.update({ status: DELETED }, { where: classmemberFilter, transaction });
    // If the execution reaches this line, no errors were thrown.
    // We commit the transaction.
    await transaction.commit();
    res.json({
      message: 'Data has been deleted.'
    });
  } catch (error) {
    // If the execution reaches this line, an error was thrown.
    // We rollback the transaction.
    await transaction.rollback();
  }

  //-----------------------------------------------------------------------------------------------------------
  // delete class within id from req.params.id
  // const model_class = m_class();
  // const classId = req.params.id;
  // await model_class.update({ status: DELETED }, { where: { id: classId } });
  // //------------------------------------------------------------------------

  // // delete related class member within m_class_id from req.params.id
  // const model_class_member = m_class_member();
  // const classmemberFilter = {
  //   m_class_id: classId
  // };
  // await model_class_member.update({ status: DELETED }, { where: classmemberFilter });
  // //------------------------------------------------------------------------

  // res.json({
  //   message: 'Data has been deleted.'
  // });
};
