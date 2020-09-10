const sec_user = require('../models/sec_user');
const STATUS = require('../enums/status.enums');
const moment = require('moment');
const isBase64 = require('is-base64');
const { ACTIVE, DELETED } = require('../enums/status.enums');

exports.findAll = async function (req, res) {
  const model_user = sec_user();
  var users = await model_user.findAll();

  res.json({ data: users });
};

exports.findOne = async function (req, res) {
  const model_user = sec_user();
  var user = await model_user.findOne({
    where: { id: req.params.id }
  });

  res.json({ data: user });
};

exports.create = async function (req, res) {
  const model_user = sec_user();
  var checkAvatar = isBase64(req.body.avatar, { allowMime: true });
  if (!checkAvatar) {
    res.status(401).json({ error: null, message: 'Format gambar tidak sesuai' });
  }

  var new_obj = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    is_email_validated: 1,
    phone: req.body.phone,
    is_phone_validated: 0,
    avatar: req.body.avatar,
    auth_provider: 1,
    is_admin: 0,
    status: ACTIVE,
    created_date: moment().format(),
    created_by: req.body.email
  };
  try {
    var datum = await model_user.create(new_obj);
    res.json({ data: datum });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.update = async function (req, res) {
  const model_user = sec_user();
  var checkAvatar = isBase64(req.body.avatar, { allowMime: true });
  // if (!checkAvatar) {
  //   res.status(401).json({ error: null, message: 'Format gambar tidak sesuai' });
  // }

  var update_obj = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    is_email_validated: 1,
    phone: req.body.phone,
    is_phone_validated: 0,
    avatar: req.body.avatar,
    auth_provider: 1,
    is_admin: req.body.is_admin,
    status: req.body.status,
    updated_date: moment().format(),
    updated_by: req.body.email
  };
  try {
    var datum = await model_user.update(update_obj, {
      where: { id: req.params.id }
    });
    res.json({ message: 'Data has been updated.' });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.delete = async function (req, res) {
  const model_user = sec_user();
  var user = await model_user.update(
    {
      status: STATUS.DELETED
    },
    { where: { id: req.params.id } }
  );

  res.json({ message: 'Data berhasil dihapus' });
};
