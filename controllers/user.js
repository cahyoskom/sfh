const sec_user = require('../models/sec_user');
const sec_token = require('../models/sec_token'); 
const { sha256 } = require('../common/sha');
const query = require('../models/query');
const { Op } = require('sequelize');
const moment = require('moment');
var config = require('../config/app.config');
var crypto = require('crypto');
var nodemailer = require('nodemailer');

exports.findAll = async function (req, res) {
  const model_user = sec_user();
  var users = await model_user.findAll();
  console.log(model_user.findAll())

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
  var new_user = {
    username: req.body.username,
    email: req.body.email,
    password: sha256(req.body.user_name + req.body.password),
    status: 1,
    created_date: moment().format(),
    avatar: req.body.avatar,
    created_by: req.body.user_name //req.user.user_name
  };
  try {
    var user = await model_user.create(new_user);
    

    const model_token = sec_token();

    var new_token = {
      sec_user_id: user.id,
      token: crypto.randomBytes(16).toString('hex'),
      valid_until: moment().add(5,'days'),
      created_date: moment().format(),
      created_by: user.id
    }
    var token = await model_token.create(new_token);
    console.log("token is saved")

    // Send the email
    var transporter = nodemailer.createTransport({
      host: 'mail.karpalabs.com',
      port: 465,
      secure: true,
      auth: {
        user: 'sfh-dev@karpalabs.com',
        pass: 'LTni_N{3Svd)'
      }
    });
    var mailOptions = { from: 'sfh-dev@karpalabs.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user\/confirmation\/' + token.token + '.\n' };
    transporter.sendMail(mailOptions, function (err) {
      console.log("transporter send")
      if (err) { return res.status(500).send({ msg: err.message }); }
      res.status(200).send('A verification email has been sent to ' + user.email + '.');
    });
    // Save the verification token
    // token.save(function (err) {
    //     if (err) { return res.status(500).send({ msg: err.message }); }
    // });

    res.json({ data: user });
  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.activation = async function (req, res) {
  const model_user = sec_user();
  const model_token = sec_token();
  var token = await model_token.findOne({
    where:{token: req.params.token}
  });
  var user = await model_user.findOne({
    where:{id: token.sec_user_id}
  });
  if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
  // Verify and save the user
  user.isVerified = true;
  await user.reload();
  res.status(200).send("The account is successfully verified. Please log in.");
};
