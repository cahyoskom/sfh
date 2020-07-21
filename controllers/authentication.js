const sec_user = require('../models/sec_user');
const sec_registrant = require('../models/sec_registrant');
const sec_token = require('../models/sec_token');
const { sha256 } = require('../common/sha');
const { Op } = require('sequelize');
const moment = require('moment');
const USER_STATUS = require('../enums/status.enums');
const mailer = require('../common/mailer');
const userController = require('./user');
const sec_confirmation = require('../models/sec_confirmation');
const crypto = require('crypto');
const { time } = require('console');
const { env } = process;

async function getLogin(email, password) {
  const model_user = sec_user();
  var user = await model_user.findOne({
    where: {
      email: email,
      password: password,
      status: USER_STATUS.ACTIVE
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
      status: USER_STATUS.ACTIVE
    }
  });
  return registrant;
}

async function getToken(user_id) {
  var token = await sec_token().findAll({
    where: { sec_user_id: user_id, status: USER_STATUS.ACTIVE }
  });
  return token;
}

async function setToken(user_id) {
  var token = await getToken(user_id);
  var now = moment();

  if (token.length > 0) {
    // token exists, delete
    sec_token().update(
      { status: USER_STATUS.DELETED },
      { where: { sec_user_id: user_id } }
    );
  }
  // create new token
  var new_token = {
    token: sha256(user_id + now.format()),
    sec_user_id: user_id,
    status: USER_STATUS.ACTIVE,
    valid_until: moment().add(env.TOKEN_VALIDITY_TIME, 'm').format()
  };

  var curr_token = await sec_token().create(new_token);
  return curr_token;
}

async function shouldSendingMail(user) {
  const model_confirmation = sec_confirmation();
  const confirmation = await model_confirmation.findOne({
    where: {
      sec_user_id: user.id,
      status: USER_STATUS.ACTIVE
    }
  });
  if (!confirmation) return false;

  const dateCr = confirmation.created_date;
  dateCr.setDate(dateCr.getDate() + 1);
  if (dateCr < new Date()) {
    return false;
  }

  const timeNow = new Date();
  var msg = `You need`;
  var duration = dateCr - timeNow;
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  await console.log(hours, minutes, seconds);
  if (hours > 0) {
    msg = msg + ' ' + hours + ' hours';
  }
  if (minutes > 0) {
    msg = msg + ' ' + minutes + ' minutes';
  }
  if (seconds > 0) {
    msg = msg + ' ' + seconds + ' seconds';
  }
  msg = msg + ' to resend mail.';

  return msg;
}

async function sendEmailJob(user, url) {
  const model_user = sec_user();
  const model_confirmation = sec_confirmation();
  const confirmation = await model_confirmation.create({
    description: 'FORGOT_PASSWORD',
    sec_user_id: user.id,
    code: crypto.randomBytes(16).toString('hex'),
    created_by: user.username,
    status: USER_STATUS.ACTIVE,
    sender_addr: env.MAIL_USERNAME
  });

  if (!confirmation) return confirmation;

  const email = await mailer({
    to: user.email,
    subject: 'Password Change',
    text:
      'Hello,\n\n' +
      "Here's your password change request: \nhttp://" +
      url +
      '/changePassword/' +
      code.code +
      '.\n'
  });

  if (!email) return email;

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
      user = registrant;
    }
  }

  var token = await setToken(user.id);
  var result = {
    user: {
      user_id: user.id,
      email: user.email,
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

exports.newPassword = async function (req, res) {
  const email = req.body.email;
  const model_user = sec_user();
  const model_registrant = sec_registrant();
  const model_confirmation = sec_confirmation();
  var user = await model_user.findOne({
    where: {
      email: email,
      status: USER_STATUS.ACTIVE
    }
  });
  if (!user) {
    user = await model_registrant.findOne({
      where: {
        email: email,
        status: USER_STATUS.ACTIVE
      }
    });
    if (!user) {
      return res.status(401).json({
        error: null,
        message: 'Email entered is wrong or not registered'
      });
    }
    return res.json({
      error: null,
      message: 'Verify your email to continue'
    });
  }

  const countdownMsg = await shouldSendingMail(user);
  if (countdownMsg) {
    return res.status(401).json({
      error: null,
      message: countdownMsg
    });
  }

  const sendEmail = await sendEmailJob(user, req.headers.host);
  if (!sendEmail) {
    return res.status(401).json({
      error: null,
      message: sendEmail.message
    });
  }

  return res.json({
    message: `An email for check validity password change has been sent to ${user.email}.`
  });
};

exports.updatePassword = async function (req, res) {
  const model_user = sec_user();
  const model_confirmation = sec_confirmation();
  const code = req.params.code;
  const email = req.body.email;
  const password = req.body.password;

  const confirm = await model_confirmation.findOne({
    where: { code: code }
  });
  if (!confirm) {
    return res.status(401).json({
      error: null,
      message: 'Token is not found please request another password change.'
    });
  }

  if (confirm.status !== USER_STATUS.ACTIVE) {
    return res.status(401).json({
      error: null,
      message: 'This code is invalid'
    });
  }

  const user = await model_user.findOne({
    where: { id: confirm.sec_user_id }
  });
  if (!user) {
    return res.status(401).json({
      error: null,
      message: 'Invalid code: account not found'
    });
  }
  if (user.email !== email) {
    return res.status(401).json({
      error: null,
      message: 'Invalid account: mismatch code'
    });
  }

  user.password = sha256(user.email + password + env.USER_SECRET);
  confirm.status = USER_STATUS.DELETED;

  await user.save();
  await confirm.save();

  return res.json({
    message: 'Your password updated'
  });
};
