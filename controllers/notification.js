const t_notification = require('../models/t_notification');
const t_notification_user = require('../models/t_notification_user');
const m_notification_default = require('../models/m_notification_default');
const moment = require('moment');

const { ACTIVE, DELETED, DEACTIVE } = require('../enums/status.enums');

exports.findAll = async (req, res) => {
  const data = await t_notification().findAll({
    where: { receiver_user_id: req.user.id, status: ACTIVE }
  });
  res.json({ data: data });
};

exports.create = async (req, res) => {
  let type = m_notification_default().findOne({
    where: { type: req.body.type }
  });
  let date = moment().format();
  let new_obj = {
    m_notification_type_id: type.id,
    sender_user_id: req.body.sender,
    receiver_user_id: req.body.receiver,
    out_id: req.body.out_id,
    out_name: req.body.out_name,
    variable: req.body.variable,
    notification_datetime: date,
    notification_year: moment.year(),
    notification_month: moment.month(),
    is_read: 0,
    status: ACTIVE
  };

  try {
    var datum = await t_notification().create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.createUser = async (req, res) => {
  const defaults = await m_notification_default().findAll({
    where: { out_id: '', out_name: '', status: ACTIVE }
  });
  for (i in defaults) {
    let new_obj = JSON.parse(JSON.stringify(defaults[i]));
    new_obj['id'] = null;
    new_obj['sec_user_id'] = req.body.id;
    try {
      t_notification_user().create(new_obj);
    } catch (err) {
      console.log(err);
    }
  }
};

exports.updateDefaults = async (req, res) => {
  const new_obj = {
    is_receive_web: req.body.is_receive_web,
    is_receive_email: req.body.is_receive_email,
    is_receive_sms: req.body.is_receive_sms
  };
  try {
    const notif = t_notification_user().update(new_obj, {
      where: { out_name: req.body.out_name, out_id: req.body.out_id, sec_user_id: req.user.id }
    });
  } catch (err) {
    console.log(err);
  }
};
