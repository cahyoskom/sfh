const { sha256 } = require("../common/sha");
const query = require("../models/query");
const { Op } = require("sequelize");
const moment = require("moment");
const m_school = require("../models/m_school");
const m_school_member = require("../models/m_school_member");
const m_class = require("../models/m_class");
const m_class_member = require("../models/m_class_member");
const m_subject = require("../models/m_subject");
const t_task = require("../models/t_task");
const t_task_file = require("../models/t_task_file");
const t_task_collection = require("../models/t_task_collection");
const t_task_collection_file = require("../models/t_task_collection_file");
const { ACTIVE, DELETED } = require("../enums/status.enums");
const isBase64 = require("is-base64");
const phoneValidator = require("validate-phone-number-node-js");

exports.findAll = async function (req, res) {
  const model_school = m_school();
  var data = await model_school.findAll();

  res.json({ data: data });
};

exports.findOne = async function (req, res) {
  const model_school = m_school();
  var datum = await model_school.findOne({
    where: { id: req.params.id, status: ACTIVE },
  });

  res.json({ data: datum });
};

exports.create = async function (req, res) {
  const model_school = m_school();
  var checkAvatar = isBase64(req.body.avatar, { allowMime: true });
  if (!checkAvatar) {
    res
      .status(401)
      .json({ error: null, message: "Format gambar tidak sesuai" });
  }
  var checkPhone = req.body.phone
    ? phoneValidator.validate(req.body.phone)
    : true;
  if (checkPhone == false) {
    res.status(401).json({ error: null, message: "Nomor telepon tidak valid" });
  }
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
    // created_by: req.body.name,
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
    m_school_id: req.body.id,
    name: req.body.name,
    address: req.body.address,
    zipcode: req.body.zipcode,
    phone: req.body.phone,
    avatar: req.body.avatar,
    status: ACTIVE,
    updated_date: moment().format(),
    // updated_by: req.body.name
  };
  try {
    var datum = await model_school.update(update_obj, {
      where: { id: req.body.id },
    });
    res.json({ message: "Data has been updated." });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.delete = async function (req, res) {
  // delete school within id from req.params.id
  const model_school = m_school();
  const schoolId = req.params.id;
  await model_school.update({ status: DELETED }, { where: { id: schoolId } });
  //------------------------------------------------------------------------

  // delete related school member within m_school_id from req.params.id
  const model_school_member = m_school_member();
  const schoolmemberFilter = {
    m_school_id: schoolId,
  };
  const schoolmemberIds = await model_school_member
    .findAll({
      attributes: ["id"],
      where: schoolmemberFilter,
    })
    .map((el) => el.dataValues.id);
  console.log(
    ">> Getting school member ids for next process:",
    schoolmemberIds
  );
  await model_school_member.update(
    { status: DELETED },
    { where: schoolmemberFilter }
  );
  //------------------------------------------------------------------------

  // delete related class within m_school_id from req.params.id
  const model_class = m_class();
  const classFilter = {
    m_school_id: schoolId,
  };
  const classIds = await model_class
    .findAll({
      attributes: ["id"],
      where: classFilter,
    })
    .map((el) => el.dataValues.id);
  console.log(">> Getting class ids for next process:", classIds);
  await model_class.update({ status: DELETED }, { where: classFilter });
  //------------------------------------------------------------------------

  // delete related class member within m_class_id from previous process when getting class ids
  const model_class_member = m_class_member();
  const classmemberFilter = {
    m_class_id: { [Op.in]: classIds },
  };
  const classmembertIds = await model_class_member
    .findAll({
      attributes: ["id"],
      where: classmemberFilter,
    })
    .map((el) => el.dataValues.id);
  console.log(">> Getting class member ids for next process:", classmembertIds);
  await model_class_member.update(
    { status: DELETED },
    { where: classmemberFilter }
  );
  //------------------------------------------------------------------------

  // delete related subject within m_class_id from previous process when getting class ids
  const model_subject = m_subject();
  const subjectFilter = {
    m_class_id: { [Op.in]: classIds },
  };
  const subjectIds = await model_subject
    .findAll({
      attributes: ["id"],
      where: subjectFilter,
    })
    .map((el) => el.dataValues.id);
  console.log(">> Getting subject ids for next process:", subjectIds);
  await model_subject.update({ status: DELETED }, { where: subjectFilter });
  //------------------------------------------------------------------------

  // delete related task within m_subject_id from previous process when getting subject ids
  const model_task = t_task();
  const taskFilter = {
    m_subject_id: {
      [Op.in]: subjectIds,
    },
  };
  const taskIds = await model_task
    .findAll({
      attributes: ["id"],
      where: taskFilter,
    })
    .map((el) => el.dataValues.id);
  console.log(">> Getting task ids for next process:", taskIds);
  await model_task.update({ status: DELETED }, { where: taskFilter });
  //------------------------------------------------------------------------

  // delete related task file within t_task_id from previous process when getting task ids
  const model_task_file = t_task_file();
  const taskfileFilter = {
    t_task_id: { [Op.in]: taskIds },
  };
  const taskfileIds = await model_task_file
    .findAll({
      attributes: ["id"],
      where: taskfileFilter,
    })
    .map((el) => el.dataValues.id);
  console.log(">> Getting task file ids for next process:", taskfileIds);
  await model_task_file.update({ status: DELETED }, { where: taskfileFilter });
  //------------------------------------------------------------------------

  // delete related task collection within t_task_id from previous process when getting task ids
  const model_task_collection = t_task_collection();
  const taskcollectionFilter = {
    t_task_id: { [Op.in]: taskIds },
  };
  const taskcollectionIds = await model_task_collection
    .findAll({
      attributes: ["id"],
      where: taskcollectionFilter,
    })
    .map((el) => el.dataValues.id);
  console.log(
    ">> Getting task collection ids for next process:",
    taskcollectionIds
  );
  await model_task_collection.update(
    { status: DELETED },
    { where: taskcollectionFilter }
  );
  //------------------------------------------------------------------------

  // delete related task collection file within t_task_id from previous process when getting task ids
  const model_task_collection_file = t_task_collection_file();
  const taskcollectionfileFilter = {
    t_task_collection_id: {
      [Op.in]: taskcollectionIds,
    },
  };
  await model_task_collection_file.update(
    { status: DELETED },
    {
      where: taskcollectionfileFilter,
    }
  );

  res.json({
    message: "Data has been deleted.",
  });
};
