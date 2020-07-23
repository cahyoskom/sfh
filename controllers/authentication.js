const moment = require('moment');
const { env } = process;

const sec_user = require('../models/sec_user');
const sec_registrant = require('../models/sec_registrant');
const sec_token = require('../models/sec_token');
const sec_confirmation = require('../models/sec_confirmation');
const m_param = require('../models/m_param');
const { sha256 } = require('../common/sha');
const { ACTIVE, DELETED } = require('../enums/status.enums');

async function getLogin(email, password) {
  const model_user = sec_user();
  var user = await model_user.findOne({
    where: {
      email: email,
      password: password,
      status: ACTIVE
    }
  });
  return user;
}

async function checkRegistrant(email, password) {
  const model_registrant = sec_registrant();
  var registrant = await model_registrant.findOne({
    where: {
      email: email,
      password: password,
      status: ACTIVE
    }
  });
  return registrant;
}

async function getToken(user_id) {
  var token = await sec_token().findAll({
    where: { sec_user_id: user_id, status: ACTIVE }
  });
  return token;
}

async function setToken(user_id) {
  var token = await getToken(user_id);
  var now = moment();

  if (token.length > 0) {
    // token exists, delete
    sec_token().update(
      { status: DELETED },
      { where: { sec_user_id: user_id } }
    );
  }
  // create new token
  const parameter = m_param();
  const TOKEN_VALIDITY = await parameter.findOne({
    attributes: ['value'],
    where: { name: 'TOKEN_VALIDITY' }
  });
  var new_token = {
    token: sha256(user_id + now.format()),
    sec_user_id: user_id,
    status: ACTIVE,
    valid_until: moment().add(TOKEN_VALIDITY.value, 'hours').format()
  };

  var curr_token = await sec_token().create(new_token);
  return curr_token;
}

async function allowResendActivation(registrant_id) {
  var confirmation = await sec_confirmation().findOne({
    where: { sec_registrant_id: registrant_id, status: ACTIVE }
  });
  if (confirmation) {
    var now = moment();
    var parameter = m_param();
    var MAIL_INTERVAL_VERIFICATION = await parameter.findOne({
      attributes: ['value'],
      where: { name: 'MAIL_INTERVAL_VERIFICATION' }
    });
    var validUntil = moment(confirmation.created_date).add(
      MAIL_INTERVAL_VERIFICATION.value,
      'hours'
    );
    if (moment(now).isAfter(moment(validUntil))) {
      return true;
    }
    return false;
  }
  return true;
}

exports.login = async function (req, res) {
  var email = req.body.email;
  var password = sha256(email + req.body.password + env.USER_SECRET);
  var user = await getLogin(email, password);

  if (!user) {
    var registrant = await checkRegistrant(email, password);
    if (!registrant) {
      res
        .status(401)
        .json({ error: 10, message: 'Email atau kata sandi salah' });
      return;
    } else {
      var resendActivation = await allowResendActivation(registrant.id);
      console.log(resendActivation);
      res.status(401).json({
        error: null,
        message: 'Silakan verifikasi email Anda terlebih dahulu',
        resendActivation: resendActivation
      });
      return;
    }
  }

  var token = await setToken(user.id);
  var result = {
    user: {
      user_id: user.id,
      email: user.email,
      name: user.name,
      is_email_validated: user.is_email_validated
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
