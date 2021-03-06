const ads_m_app_page = require('../models/ads_m_app_page');
const { sha256 } = require('../common/sha');
const moment = require('moment');
const { Op } = require('sequelize');
const { ACTIVE } = require('../enums/status.enums');
const STATUS = require('../enums/status.enums');

exports.findAll = async function (req, res) {
  const model_ads_m_app_page = ads_m_app_page();
  const q_item = parseInt(req.query.page_item) ? +parseInt(req.query.page_item) : 3;
  const q_offset = parseInt(req.query.offset) ? parseInt(req.query.offset) * q_item : 0;

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

  if (req.query.m_ads_app_id) {
    filter = {
      ...filter,
      m_ads_app_id: { [Op.like]: req.query.m_ads_app_id }
    };
  }

  var adsMAppPage = await model_ads_m_app_page.findAll({
    where: filter,
    limit: q_item,
    offset: q_offset
  });

  const allData = await model_ads_m_app_page.findAll({
    where: {
      status: 1
    }
  });

  const dataLength = allData.length;
  console.log('dataLength: ' + dataLength);

  res.json({ data: adsMAppPage, dataMPageLength: dataLength });
};

exports.findOne = async function (req, res) {
  const model_ads_m_app_page = ads_m_app_page();
  var adsMAppPage = await model_ads_m_app_page.findOne({ where: { id: req.params.id } });

  res.json({ data: adsMAppPage });
};

exports.create = async function (req, res) {
  const model_ads_m_app_page = ads_m_app_page();
  console.log(req.body);
  if (!req.body.name || !req.body.url || !req.body.m_ads_app_id) {
    res.status(400).send({
      message: 'Field can not be empty!'
    });
    return;
  }
  // console.log(req.body.name);
  var new_obj = {
    m_ads_app_id: req.body.m_ads_app_id,
    name: req.body.name,
    url: req.body.url,
    status: ACTIVE,
    created_date: moment().format(),
    created_by: req.user.user_name
  };

  try {
    var datum = await model_ads_m_app_page.create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.update = async function (req, res) {
  const model_ads_m_app_page = ads_m_app_page();
  var update_obj = {
    m_ads_app_id: req.body.m_ads_app_id,
    name: req.body.name,
    url: req.body.url,
    status: req.body.status,
    created_date: moment().format(),
    created_by: req.user.user_name
  };

  try {
    var datum = await model_ads_m_app_page.update(update_obj, {
      where: { id: req.params.id }
    });
    res.json({ message: 'Data has been updated.' });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.delete = async function (req, res) {
  const model_ads_m_app_page = ads_m_app_page();
  model_ads_m_app_page.update({ status: STATUS.DELETED }, { where: { id: req.params.id } });

  res.json({ message: 'Data deleted successfully.' });
};
