const sec_user = require('../models/sec_user');
const sec_reg = require('../models/sec_registrant');
const { sha256 } = require('../common/sha');
const query = require('../models/query');
const { Op, json } = require('sequelize');
const moment = require('moment');
var config = require('../config/app.config');
const USER_STATUS = require('../enums/status.enums');
var passwordValidator = require('password-validator');

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
    username: req.body.username,
    email: req.body.email,
    password: sha256(req.body.user_name + req.body.password),
    phone: req.body.phone,
    status: 1,
    created_date: moment().format(),
    created_by: req.body.username
  };


  try {
  
    var checkPW = pwValidator.validate(req.body.password);
    
    if(checkPW == false ){
      return res.status(400).send({ message: "Password yang dimasukkan tidak sesuai kriteria" });
    }else{
      var user = await model_user.create(new_user);
      return res.json({ data: user });
    }

  } catch (err) {
    res.status(411).json({ error: 11, message: err.message });
  }
};

exports.delete = async function(req, res){
  const model_user = sec_user();
  var user = await model_user.update({ 
    status: USER_STATUS.DELETED},
    { where: { id: req.params.id }
    });

  res.json({ data: user });
};