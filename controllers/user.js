const sec_user = require('../models/sec_user');
const sec_reg = require('../models/sec_registrant');
const sec_confirm = require('../models/sec_confirmation');
const { sha256 } = require('../common/sha');
const query = require('../models/query');
const { Op, json } = require('sequelize');
const moment = require('moment');
var config = require('../config/app.config');
const USER_STATUS = require('../enums/status.enums');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const STATUS = require('../enums/status.enums');

var passwordValidator = require('password-validator');
const phoneValidator = require('validate-phone-number-node-js');
var emailValidator = require("email-validator");
const user = require('../routes/user/user');
const { time } = require('console');

var pwValidator = new passwordValidator()

pwValidator
  .is().min(8)                                   
  .is().max(100)                                  
  .has().uppercase()                              
  .has().lowercase()                              
  .has().digits()                                 
  .has().not().spaces();   
  
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
  const model_user = sec_reg();

  var new_user = {
    name: req.body.name,
    //username: req.body.username,
    email: req.body.email,
    password: sha256(req.body.user_name + req.body.password),
    phone: req.body.phone,
    status: 1,
    created_date: moment().format(),
    created_by: req.body.username
  };

  //check phone number is filled or not
  if( !new_user.phone ){
    new_user.phone == "";
  }

  //try to check all component of form
  try {
  
    var checkPW = pwValidator.validate(req.body.password);
    var checkPhone = phoneValidator.validate(req.body.phone);
    var checkEmail = emailValidator.validate(req.body.email);
    
    if(checkPW == false ){
      return res.status(400).send({ message: "Password yang dimasukkan tidak sesuai kriteria" });
    }else if(new_user.phone){
      if(checkPhone == false){
        return res.status(400).send({ message: "Nomor Telepon yang dimasukkan tidak sesuai kriteria" });
      }
    }else if(checkEmail == false){
      return res.status(400).send({ message: "Email yang dimasukkan tidak sesuai kriteria" });
    }
    else{
      var user = await model_user.create(new_user);
      verifyEmail(user,req.headers.host, res);
      return res.json({ data: user });
    }


  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

async function verifyEmail(user, url, res){
  const model_confirmation = sec_confirm();
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

async function checkLink(reg){
  const model_confirmation = sec_confirm();
  const confirmation = await model_confirmation.findOne({
    where:{
      sec_registrant_id: reg.id,
      status: USER_STATUS.ACTIVE
    }
  })

  //checking attribute
  if(!confirmation) return "Continue";
  
  //get created_date from table sec_confiramtion
  const createDate = confirmation.created_date;

  //initialization date to get current timestamp
  var today = new Date();

  //add 1 hour to created_date
  var plus1 = moment(createDate).add(1, 'hours');

  //get only time from created_date column
  createdTime = moment(plus1).format(moment.HTML5_FMT.TIME_SECONDS);
  console.log('Waktu Akun dibuat + 1: ' +createdTime);

  //get only time from current time
  timeNow = moment(today).format(moment.HTML5_FMT.TIME_SECONDS);
  console.log('Waktu Sekarang: ' +timeNow);

  //compare the added created date with current time
  if(createdTime < timeNow){
    return true;
  }else{
    return false;
  }

}

exports.activation = async function (req, res) {
  const model_registrant = sec_reg();
  const model_confirmation = sec_confirm();
  const model_user = sec_user();

  var confirmation = await model_confirmation.findOne({
    where:{code: req.params.token}
  });
  var regis = await model_registrant.findOne({
    where:{id: confirmation.sec_registrant_id}
  });

  const checkActiveLink = await checkLink(regis);

  console.log(checkActiveLink);

  //check link already used or not
  if(confirmation.status !== STATUS.ACTIVE) return res.status(400).send({type: 'link expired', msg: 'This link is already used'});

  //check link is verified
  if (regis.is_email_validated) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });

  //check active link from id
  if(checkActiveLink == true)
    return res.send(checkActiveLink)
    await verifyEmail(regis, req.headers.host)

  // Verify and save the user
  regis.is_email_validated = true;
  await regis.save();
  confirmation.status = STATUS.DELETED;
  await confirmation.save();

  //copy data from regis to user
  if(confirmation.status == STATUS.DELETED){
    var copy_to_user = {
      name : regis.name,
      //username: regis.username,
      email: regis.email,
      password: regis.password,
      phone: regis.phone,
      status: 1,
      created_date: moment().format(),
      created_by: 'SYSTEM',
      is_email_validated: STATUS.ACTIVE

    }
    var copy = await model_user.create(copy_to_user);

    return res.json({ data:copy, message: "The account is successfully verified. Please log in." });
  }

};

exports.delete = async function(req, res){
  const model_user = sec_user();
  var user = await model_user.update({ 
    status: USER_STATUS.DELETED},
    { where: { id: req.params.id }
    });

  res.json({ message: "Data berhasil dihapus" });
};