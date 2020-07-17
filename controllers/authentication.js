const sec_user = require('../models/sec_user');
const sec_registrant = require('../models/sec_registrant')
const sec_token = require('../models/sec_token');
const { sha256 } = require('../common/sha');
const { Op } = require('sequelize');
const moment = require('moment');
const USER_STATUS = require('../enums/status.enums');

async function getLogin(email, password) {
  const model_user = sec_user();
  var user = await model_user.findOne({
    where: {
      email: email ,
      password: password,
      status: USER_STATUS.ACTIVE
    }
  });
  return user;
}

async function checkRegistrant(email, password){
  const model_registrant = sec_registrant();
  var registrant = await model_registrant.findOne({
    where:{
      email : email,
      password : password,
      status: USER_STATUS.ACTIVE
    }
  });
  return registrant
}

async function getToken(user_id) {
  var token = await sec_token().findAll({ where: { sec_user_id: user_id } });
  return token;
}

async function setToken(user_id) {
  var token = await getToken(user_id);
  var now = moment();

  if (token.length > 0) {
    // token exists, delete
    sec_token().destroy({ where: { sec_user_id: user_id } });
  }
  // create new token
  var new_token = {
    token: sha256(user_id + now.format()),
    sec_user_id: user_id,
    valid_until: moment().add(process.env.TOKEN_VALIDITY_TIME, 'm').format()
  };

  var curr_token = await sec_token().create(new_token);
  return curr_token;
}

exports.login = async function (req, res) {
  var email = req.body.email;
  var password = sha256(email + req.body.password);
  // var password = req.body.password

  var user = await getLogin(email, password);

  if (!user) {
    var registrant = await checkRegistrant(email, password);
    if (!registrant){
      res
      .status(401)
      .json({ error: 10, message: 'Email atau kata sandi salah' });
      return;
    } else{
      user = registrant;
    }
  }

  var token = await setToken(user.id);
  var result = {
    user: {
      user_id: user.id,
      user_name: user.username,
      email: user.email,
      is_email_validated : user.is_email_validated
    },
    token: token.token,
    token_validity: token.valid_until
  };
  res.json(result);
};

exports.checkToken = async function (req, res) {
  var token = await sec_token().findOne({
    where: { token: req.params.token }
  });
  var isValid = false;
  var reason = '';
  if (token.length == 0) {
    reason = 'No token found';
  } else {
    var now = moment();
    var expiry_date = moment(token.valid_until);
    isValid = now.isBefore(expiry_date);
    if (!isValid) {
      reason = 'Token already expired';
    }
  }
  res.json({ isValid: isValid, reason: reason });
};
