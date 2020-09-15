const ads_m_rates = require('../models/ads_m_rates');
const { sha256 } = require('../common/sha');
const moment = require('moment');
const { Op } = require('sequelize');
const { ACTIVE } = require('../enums/status.enums');
const STATUS = require('../enums/status.enums');

exports.findAll = async function (req, res) {
  const model_ads_m_rates = ads_m_rates();
  const q_item = parseInt(req.query.page_item) ? +parseInt(req.query.page_item) : 3;
  const q_offset = parseInt(req.query.offset) ? parseInt(req.query.offset) * q_item : 0;

  console.log(q_item);
  console.log(q_offset);

  var filter = {
    status: 1
  };

  if (req.query.ads_m_spot_id) {
    filter = {
      ...filter,
      ads_m_spot_id: { [Op.like]: req.query.ads_m_spot_id }
    };
  }

  if (req.query.price) {
    filter = {
      ...filter,
      price: { [Op.like]: req.query.price }
    };
  }

  if (req.query.duration_unit) {
    filter = {
      ...filter,
      duration_unit: { [Op.like]: req.query.duration_unit }
    };
  }

  var adsMRates = await model_ads_m_rates.findAll({
    where: filter,
    limit: q_item,
    offset: q_offset
  });

  const allData = await model_ads_m_rates.findAll({
    where: {
      status: 1
    }
  });

  const dataPageLength = allData.length;
  console.log('dataPageLength: ' + dataPageLength);

  res.json({ data: adsMRates, dataPageLength: dataPageLength });
};

exports.findOne = async function (req, res) {
  const model_ads_m_rates = ads_m_rates();
  var adsMRates = await model_ads_m_rates.findOne({ where: { id: req.params.id } });

  res.json({ data: adsMRates });
};

exports.create = async function (req, res) {
  const model_ads_m_rates = ads_m_rates();
  console.log(req.body);
  if (
    !req.body.ads_m_spot_id ||
    !req.body.price ||
    !req.body.frequence ||
    !req.body.duration ||
    !req.body.duration_unit
  ) {
    res.status(400).send({
      message: 'Field can not be empty!'
    });
    return;
  }
  // console.log(req.body.name);
  var new_obj = {
    ads_m_spot_id: req.body.ads_m_spot_id,
    price: req.body.price,
    frequence: req.body.frequence,
    duration: req.body.duration,
    duration_unit: req.body.duration_unit,
    status: ACTIVE,
    created_date: moment().format(),
    created_by: req.user.user_name
  };

  try {
    var datum = await model_ads_m_rates.create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.update = async function (req, res) {
  const model_ads_m_rates = ads_m_rates();
  var update_obj = {
    ads_m_spot_id: req.body.ads_m_spot_id,
    price: req.body.price,
    frequence: req.body.frequence,
    duration: req.body.duration,
    duration_unit: req.body.duration_unit,
    status: req.body.status,
    created_date: moment().format(),
    created_by: req.user.user_name
  };

  try {
    var datum = await model_ads_m_rates.update(update_obj, {
      where: { id: req.params.id }
    });
    res.json({ message: 'Data has been updated.' });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.delete = async function (req, res) {
  const model_ads_m_rates = ads_m_rates();
  model_ads_m_rates.update({ status: STATUS.DELETED }, { where: { id: req.params.id } });

  res.json({ message: 'Data deleted successfully.' });
};
