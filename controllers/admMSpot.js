const ads_m_spot = require('../models/ads_m_spot');
const { sha256 } = require('../common/sha');
const moment = require('moment');
const { Op } = require('sequelize');
const { ACTIVE } = require('../enums/status.enums');
const STATUS = require('../enums/status.enums');

exports.findAll = async function (req, res) {
  const model_ads_m_spot = ads_m_spot();
  const q_item = parseInt(req.query.page_item) ? +parseInt(req.query.page_item) : 3;
  const q_offset = parseInt(req.query.offset) ? parseInt(req.query.offset) * q_item : 0;

  console.log(q_item);
  console.log(q_offset);

  var filter = {
    status: 1
  };

  if (req.query.ads_m_app_page) {
    filter = {
      ...filter,
      ads_m_app_page: { [Op.like]: req.query.ads_m_app_page }
    };
  }

  if (req.query.position) {
    filter = {
      ...filter,
      position: { [Op.like]: req.query.position }
    };
  }

  if (req.query.width) {
    filter = {
      ...filter,
      width: { [Op.like]: req.query.width }
    };
  }

  if (req.query.height) {
    filter = {
      ...filter,
      height: { [Op.like]: req.query.height }
    };
  }

  var adsMSpot = await model_ads_m_spot.findAll({
    where: filter,
    limit: q_item,
    offset: q_offset
  });

  const allData = await model_ads_m_spot.findAll({
    where: {
      status: 1
    }
  });

  const dataLength = allData.length;
  console.log('dataLength: ' + dataLength);

  res.json({ data: adsMSpot, dataMSpotLength: dataLength });
};

exports.findOne = async function (req, res) {
  const model_ads_m_spot = ads_m_spot();
  var adsMSpot = await model_ads_m_spot.findOne({ where: { id: req.params.id } });

  res.json({ data: adsMSpot });
};

exports.create = async function (req, res) {
  const model_ads_m_spot = ads_m_spot();
  console.log(req.body);
  if (!req.body.position || !req.body.width || !req.body.height || !req.body.ads_m_app_page) {
    res.status(400).send({
      message: 'Field can not be empty!'
    });
    return;
  }
  // console.log(req.body.name);
  var new_obj = {
    ads_m_app_page: req.body.ads_m_app_page,
    position: req.body.position,
    width: req.body.width,
    height: req.body.height,
    status: ACTIVE,
    created_date: moment().format(),
    created_by: req.user.user_name
  };

  try {
    var datum = await model_ads_m_spot.create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.update = async function (req, res) {
  const model_ads_m_spot = ads_m_spot();
  var update_obj = {
    ads_m_app_page: req.body.ads_m_app_page,
    position: req.body.position,
    width: req.body.width,
    height: req.body.height,
    status: req.body.status,
    created_date: moment().format(),
    created_by: req.user.user_name
  };

  try {
    var datum = await model_ads_m_spot.update(update_obj, {
      where: { id: req.params.id }
    });
    res.json({ message: 'Data has been updated.' });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.delete = async function (req, res) {
  const model_ads_m_spot = ads_m_spot();
  model_ads_m_spot.update({ status: STATUS.DELETED }, { where: { id: req.params.id } });

  res.json({ message: 'Data deleted successfully.' });
};
