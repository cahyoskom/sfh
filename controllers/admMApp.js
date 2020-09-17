const ads_m_app = require('../models/ads_m_app');
const { sha256 } = require('../common/sha');
const moment = require('moment');
const { Op } = require('sequelize');
const { ACTIVE } = require('../enums/status.enums');
const STATUS = require('../enums/status.enums');

exports.findAll = async function (req, res) {
  const model_ads_m_app = ads_m_app();
  const q_item = parseInt(req.query.page_item) ? +parseInt(req.query.page_item) : 3;
  const q_offset = parseInt(req.query.offset) ? parseInt(req.query.offset) * q_item : 0;
  // const q_item = parseInt(req.query.page_item);
  // const q_offset = parseInt(req.query.offset);

  console.log(q_item);
  console.log(q_offset);

  var filter = {
    status: 1
  };

  if (req.query.name) {
    filter = {
      ...filter,
      name: { [Op.like]: req.query.name }
    };
  }

  var adsMApp = await model_ads_m_app.findAll({
    where: filter,
    limit: q_item,
    offset: q_offset
  });

  const allData = await model_ads_m_app.findAll({
    where: {
      status: 1
    }
  });

  const dataLength = allData.length;
  console.log('dataLength: ' + dataLength);

  res.json({ data: adsMApp, dataMAppLength: dataLength });
};

exports.findOne = async function (req, res) {
  const model_ads_m_app = ads_m_app();
  var adsMApp = await model_ads_m_app.findOne({ where: { id: req.params.id } });

  res.json({ data: adsMApp });
};

exports.create = async function (req, res) {
  const model_ads_m_app = ads_m_app();
  console.log(req.body);
  if (!req.body.name) {
    res.status(400).send({
      message: 'Field can not be empty!'
    });
    return;
  }
  // console.log(req.body.name);
  var new_obj = {
    name: req.body.name,
    status: ACTIVE,
    created_date: moment().format(),
    created_by: req.user.user_name
  };

  try {
    var datum = await model_ads_m_app.create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.update = async function (req, res) {
  const model_ads_m_app = ads_m_app();
  var update_obj = {
    name: req.body.name,
    status: req.body.status,
    created_date: moment().format(),
    created_by: req.user.user_name
  };

  try {
    var datum = await model_ads_m_app.update(update_obj, {
      where: { id: req.params.id }
    });
    res.json({ message: 'Data has been updated.' });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.delete = async function (req, res) {
  const model_ads_m_app = ads_m_app();
  model_ads_m_app.update({ status: STATUS.DELETED }, { where: { id: req.params.id } });

  res.json({ message: 'Data deleted successfully.' });
};
