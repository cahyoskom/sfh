const sec_user = require('../models/sec_user');
const moment = require('moment');
const isBase64 = require('is-base64');
const { sha256 } = require('../common/sha');
const pwValidator = /(?=.{6,}$)/;
const phoneValidator = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;

exports.findOne = async function (req, res) {
  const model_user = sec_user();
  var user = await model_user.findOne({
    where: { id: req.params.id }
  });

  res.json({ data: user });
};

exports.getProfile = async function (req, res) {
  const usernya = req.user;
  const model = usernya.dataValues;

  //console.log(usernya);
  console.log('batas----------------------------------------------------');
  console.log(model);

  const model_user = sec_user();
  var user = await model_user.findOne({
    attributes: ['name', 'email', 'phone', 'avatar', 'password'],
    where: { id: req.user.dataValues.id }
  });

  res.json({ data: user });
};

exports.update = async function (req, res) {
  const model_user = sec_user();

  var update_obj = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    avatar: req.body.avatar
  };

  var checkAvatar = isBase64(req.body.avatar, { allowMime: true });
  if (!checkAvatar) {
    res.status(401).json({ error: null, message: 'Format gambar tidak sesuai' });
  }

  var checkPhone = req.body.phone ? phoneValidator.test(req.body.phone) : true;
  if (checkPhone == false) {
    throw new Error('Nomor telepon yang dimasukkan tidak sesuai kriteria');
  }

  if (req.body.name == '' && req.body.phone == '') {
    var getNamePhone = await model_user.findOne({
      attributes: ['name', 'phone'],
      where: { id: req.user.dataValues.id }
    });

    update_obj.name = getNamePhone.name;
    update_obj.phone = getNamePhone.phone;

    res.status(401).json({ error: null, message: 'Nama dan Nomor Telepon Tidak Boleh Kosong' });
  } else if (req.body.name == '') {
    var getName = await model_user.findOne({
      attributes: ['name'],
      where: { id: req.user.dataValues.id }
    });

    update_obj.name = getName.name;

    res.status(401).json({ error: null, message: 'Nama Tidak Boleh Kosong' });
  } else if (req.body.phone == '') {
    var getPhone = await model_user.findOne({
      attributes: ['phone'],
      where: { id: req.user.dataValues.id }
    });

    update_obj.phone = getPhone.phone;

    res.status(401).json({ error: null, message: 'Nomor Telepon Tidak Boleh Kosong' });
  }

  if (req.body.password != '' && req.body.new_password != '') {
    var update_obj = {
      name: req.body.name,
      email: req.body.email,
      password: sha256(req.body.email + req.body.password + process.env.USER_SECRET),
      new_password: sha256(req.body.email + req.body.new_password + process.env.USER_SECRET),
      re_new_password: sha256(req.body.email + req.body.re_new_password + process.env.USER_SECRET),
      phone: req.body.phone,
      avatar: req.body.avatar
    };
    var checkPW = await model_user.findOne({
      attributes: ['password'],
      where: { id: req.user.dataValues.id }
    });

    var pwChecker = req.body.new_password ? pwValidator.test(req.body.new_password) : true;
    if (pwChecker == false) {
      res.status(401).json({ error: null, message: 'Masukkan Minimal 6 Karakter' });
    }
    console.log(pwChecker);

    var pwLamaSama = checkPW.password == update_obj.password;
    var pwBaruSama = update_obj.new_password == update_obj.re_new_password;

    if (checkPW.password != update_obj.password) {
      res.status(401).json({ error: null, message: 'Password Lama Salah' });
    } else if (update_obj.new_password != update_obj.re_new_password) {
      res.status(401).json({ error: null, message: 'Password Tidak Sama' });
    } else if (checkPW.password == update_obj.new_password) {
      res.status(401).json({ error: null, message: 'Password Lama dan Password Baru Sama' });
    } else if (pwChecker && pwLamaSama && pwBaruSama) {
      update_obj.password = update_obj.new_password;
    }
  }

  try {
    var datum = await model_user.update(update_obj, {
      where: { id: req.user.dataValues.id }
    });
    res.json({ message: 'Data has been updated.' });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};
