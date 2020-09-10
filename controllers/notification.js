const t_notification = require('../models/t_notification');
const t_notification_user = require('../models/t_notification_user');
const m_notification_default = require('../models/m_notification_default');
const m_notification_type = require('../models/m_notification_type');
const t_class_member = require('../models/t_class_member');
const { query } = require('../models/query');

const moment = require('moment');

const { ACTIVE, DELETED, DEACTIVE } = require('../enums/status.enums');
let notificationData = [];

exports.findAll = async (req, res) => {
  const sql = `
  SELECT m_notification_type.id, m_notification_type.content, 
  m_notification_type.content_url,
  m_notification_type.type,
  m_notification_type.action_yes,
  m_notification_type.action_no,
  t_notification.id AS id_notif,
  t_notification.m_notification_type_id,
  t_notification.notification_datetime, t_notification.is_read, 
  t_notification.receiver_user_id, sec_user.id,
  IF(DATEDIFF(CURDATE(), DATE(t_notification.notification_datetime)) = 0, 'TODAY', IF(DATEDIFF(CURDATE(), DATE(t_notification.notification_datetime)) = 1, 'YESTERDAY', t_notification.notification_datetime)) humanDate 
  FROM m_notification_type INNER JOIN t_notification INNER 
  JOIN sec_user ON 
  m_notification_type.id=t_notification.m_notification_type_id 
  AND sec_user.id = 
  t_notification.receiver_user_id 
  WHERE t_notification.receiver_user_id = :id AND 
  DATEDIFF(CURDATE(), DATE(t_notification.notification_datetime)) < 4
  ORDER BY t_notification.notification_datetime DESC
  `;
  var test = await query(sql, {
    id: req.user.id
  });
  res.json({ data: test });
};

exports.deleteNotification = async (req, res) => {
  try {
    let data = await t_notification().destroy({
      where: { m_notification_type_id: req.params.id }
    });

    if (!data) {
      return res.status(411).json({ message: 'cannot delete' });
    }

    res.json({ deleted: data, success: true });
  } catch (error) {
    res.json({ res: 'Failed to delete', success: false });
  }
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

exports.isRead = async (req, res) => {
  const update_obj = {
    is_read: 1
  };
  try {
    var read = await t_notification().update(update_obj, {
      where: { receiver_user_id: req.body.id }
    });

    if (!read) {
      res.status(401).json({ message: 'Gagal Membaca' });
      return;
    }

    res.json('success update!');
    res.json({ data: read });
  } catch (error) {
    res.json({ error });
  }
};

exports.isReadById = async (req, res) => {
  const update_obj = {
    is_read: req.body.is_read
  };
  try {
    var read = await t_notification().update(update_obj, {
      where: { receiver_user_id: req.body.id, m_notification_type_id: req.body.type_id }
    });

    if (!read) {
      res.status(401).json({ message: 'Gagal Membaca' });
      return;
    }

    res.json('success update!');
    res.json({ data: read });
  } catch (error) {
    res.json({ error });
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

exports.defaultSetting = async (req, res) => {
  try {
    var data = await t_notification_user().findAll({
      where: { sec_user_id: req.user.id }
    });
    res.json({ data, success: true });
  } catch (error) {
    res.json({ error, test: 'aaaa' });
  }
};

exports.updateDefaults = async (req, res) => {
  const new_obj = {
    is_receive_web: req.body.is_receive_web,
    is_receive_email: req.body.is_receive_email
    // is_receive_sms: req.body.is_receive_sms
  };
  try {
    const notif = t_notification_user().update(new_obj, {
      // where: { out_name: req.body.out_name, out_id: req.body.out_id, sec_user_id: req.user.id, m_notification_type_id: req.body.m_id }
      where: { m_notification_type_id: req.body.type_id, sec_user_id: req.user.id }
    });
    res.json({ update: notif, success: true });
  } catch (err) {
    console.log(err);
  }
};

exports.updateMasterNotification = async (req, res) => {
  const obj = {
    is_receive_web: req.body.is_receive_web,
    is_receive_email: req.body.is_receive_email
    // is_receive_sms: req.body.is_receive_sms
  };
  try {
    const notif = t_notification_user().update(obj, {
      // where: { out_name: req.body.out_name, out_id: req.body.out_id, sec_user_id: req.user.id, m_notification_type_id: req.body.m_id }
      where: { sec_user_id: req.user.id, out_id: req.body.out_id, out_name: req.body.out_name }
    });
    res.json({ update: notif, success: true });
  } catch (err) {
    console.log(err);
  }
};

exports.findClass = async (req, res) => {
  const sql = `SELECT t_class.name, t_class.id, t_class_member.t_class_id, t_class_member.sec_user_id
  FROM t_class INNER JOIN t_class_member ON t_class.id = t_class_member.t_class_id
  WHERE t_class_member.sec_user_id = :id
  ORDER BY t_class.name ASC`;
  var findClass = await query(sql, {
    id: req.user.id
  });
  res.json({ data_class: findClass });
};

exports.findSchool = async (req, res) => {
  const sql = `SELECT t_school.name, t_school.id, t_school_member.t_school_id, t_school_member.sec_user_id
  FROM t_school INNER JOIN t_school_member ON t_school.id = t_school_member.t_school_id
  WHERE t_school_member.sec_user_id = :id
  ORDER BY t_school.name ASC`;
  var findSchool = await query(sql, {
    id: req.user.id
  });
  res.json({ data_school: findSchool });
};

exports.getSettingKelas = async (req, res) => {
  const sql = `
  SELECT
  m_notification_type.id,
  m_notification_type.activity,
  m_notification_type.type,
  t_notification_user.m_notification_type_id,
  t_notification_user.is_receive_web,
  t_notification_user.is_receive_email,
  t_notification_user.id,
  t_notification_user.sec_user_id,
  sec_user.id
  FROM m_notification_type INNER JOIN t_notification_user INNER 
  JOIN sec_user ON
  m_notification_type.id=t_notification_user.m_notification_type_id
  AND sec_user.id = t_notification_user.sec_user_id 
  WHERE t_notification_user.sec_user_id = :id AND m_notification_type.type REGEXP '^CLASS|^USER'`;
  var test = await query(sql, {
    id: req.user.id
  });
  res.json({ data: test });
};

exports.getSettingSchool = async (req, res) => {
  const sql = `
  SELECT
  m_notification_type.id,
  m_notification_type.activity,
  m_notification_type.type,
  t_notification_user.m_notification_type_id,
  t_notification_user.is_receive_web,
  t_notification_user.is_receive_email,
  t_notification_user.id,
  t_notification_user.sec_user_id,
  sec_user.id
  FROM m_notification_type INNER JOIN t_notification_user INNER 
  JOIN sec_user ON 
  m_notification_type.id=t_notification_user.m_notification_type_id 
  AND sec_user.id = t_notification_user.sec_user_id 
  WHERE t_notification_user.sec_user_id = :id AND m_notification_type.type LIKE 'SCHOOL%' ORDER BY activity ASC`;
  var test = await query(sql, {
    id: req.user.id
  });
  res.json({ data: test });
};
