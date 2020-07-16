const sec_user = require('../models/sec_user');
const sec_registrant = require('../models/sec_registrant');
const sec_token = require('../models/sec_token'); 
const sec_confirmation = require('../models/sec_confirmation')
const STATUS = require('../enums/status.enums');
const { sha256 } = require('../common/sha');
const query = require('../models/query');
const { Op } = require('sequelize');
const moment = require('moment');
var config = require('../config/app.config');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const { send } = require('process');
//const verifyEmail = require('verifyEmail')


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
  const model_registrant = sec_registrant();
  var new_user = {
    username: req.body.username,
    email: req.body.email,
    password: sha256(req.body.user_name + req.body.password),
    status: 1,
    created_date: moment().format(),
    avatar: req.body.avatar,
    created_by: req.body.user_name //req.user.user_name
  };
  var user = await model_registrant.create(new_user);
  verifyEmail(user,req.headers.host,res);
  // try {
  //   var user = await model_registrant.create(new_user);
  //   verifyEmail(user.email);

  //   res.json({ data: user });
  // } catch (err) {
  //   res.status(411).json({ error: 11, message: err.message });
  // }
};
async function verifyEmail(user,url,res){
  const model_registrant = sec_registrant();
  //var user = model_registrant.findOne({where:{email:user.email}});
  const model_confirmation = sec_confirmation();
  const sender = 'sfh-dev@karpalabs.com'
  var new_confirmation = {
    description:"Email activision",
    sec_registrant_id: user.id,
    code: crypto.randomBytes(16).toString('hex'),
    created_by: user.username,
    status: STATUS.ACTIVE,
    sender_addr:sender
  }
  var code = await model_confirmation.create(new_confirmation);
  console.log("code is saved")

  var transporter = nodemailer.createTransport({
    host: 'mail.karpalabs.com',
    port: 465,
    secure: true,
    auth: {
      user: sender,
      pass: 'LTni_N{3Svd)'
    }
  });
  var mailOptions = { 
    from: sender, 
    to: user.email,
    subject: 'Account Verification Token',
    text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + url + '\/user\/confirmation\/' + code.code + '.\n' 
  };

  transporter.sendMail(mailOptions, function (err) {
    console.log("transporter send")
    if (err) { return res.status(500).send({ msg: err.message });  }
    res.status(200).send('A verification email has been sent to ' + user.email + '.');
  });
  return;
}
exports.verifyEmail = verifyEmail;

exports.activation = async function (req, res) {
  const model_registrant = sec_registrant();
  const model_confirmation = sec_confirmation();
  var confirmation = await model_confirmation.findOne({
    where:{code: req.params.token}
  });
  var regis = await model_registrant.findOne({
    where:{id: confirmation.sec_registrant_id}
  });
  if(confirmation.status !== STATUS.ACTIVE) return res.status(400).send({type: 'link expired', msg: 'This link is already used'});

  if (regis.is_email_validated) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
  // Verify and save the user
  regis.is_email_validated = true;
  await regis.save();
  confirmation.status = STATUS.DELETED;
  await confirmation.save();
  return res.status(200).send("The account is successfully verified. Please log in.");
};
