const { Op } = require('sequelize');
const moment = require('moment');
const crypto = require('crypto');
const { time } = require('console');
const { env } = process;
const passwordValidator = require('password-validator');
const phoneValidator = require('validate-phone-number-node-js');
const emailValidator = require('email-validator');

const sec_user = require('../models/sec_user');
const sec_registrant = require('../models/sec_registrant');
const sec_token = require('../models/sec_token');
const sec_confirmation = require('../models/sec_confirmation');
const Confirmation = require('./confirmation');
const { sha256 } = require('../common/sha');
const mailer = require('../common/mailer');
const { ACTIVE, DELETED } = require('../enums/status.enums');
const userController = require('./user');
// const pwValidator = new passwordValidator()
//   .is()
//   .min(8)
//   .is()
//   .max(100)
//   .has()
//   .uppercase()
//   .has()
//   .lowercase()
//   .has()
//   .digits()
//   .has()
//   .not()
//   .spaces();

async function shouldSendingMail(people, type) {
  const model_confirmation = sec_confirmation();
  const field = type === 'user' ? 'sec_user_id' : 'sec_registrant_id';
  const confirmation = await model_confirmation.findOne({
    where: {
      [field]: people.id,
      status: ACTIVE
    }
  });
  if (!confirmation) return false;

  const timeNow = new Date();
  const dateCr = confirmation.created_date;

  dateCr.setDate(dateCr.getDate() + 1);
  if (dateCr < timeNow) {
    return false;
  }

  const diffTime = moment(dateCr).diff(timeNow);
  const duration = moment.duration(diffTime);
  const durationStr = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');

  return `Please wait, you need ${durationStr} to resend mail.`;
}

exports.create = async function (req, res) {
  const model_registrant = sec_registrant();
  const model_confirmation = sec_confirmation();
  const model_user = sec_user();

  var new_user = {
    name: req.body.name,
    email: req.body.email,
    password: sha256(
      req.body.email + req.body.password + process.env.USER_SECRET
    ),
    phone: req.body.phone,
    status: ACTIVE,
    created_date: moment().format()
  };

  const checkReg = await model_registrant.findOne({
    where: {
     email: new_user.email
    }
  })

  if(checkReg){
    const checkConfirmation = await model_confirmation.findOne({
      where: {
        sec_registrant_id: checkReg.id
      }
    })

    const checkUser = await model_user.findOne({
      where: {
        email: checkReg.email
      }
    })

    if(checkReg){
      if(checkReg.status == ACTIVE){
        if(checkConfirmation){
          if(checkConfirmation.status == ACTIVE){
            throw new Error('Harap Aktivasi Email');
          }else if(checkConfirmation.status == DELETED){
            throw new Error('Resend Email Activasion');
          }
        }
      }else if(checkReg.status == DELETED){
        if(checkUser.is_email_validated == ACTIVE){
          throw new Error('User Sudah Terdaftar');
        }
      }
    }
  }
  
 
  const registrant = await model_registrant.create(new_user);
  if (!registrant) throw registrant;

  try {
    var checkEmail = emailValidator.validate(req.body.email);
    if (checkEmail == false) {
      throw new Error('Email yang dimasukkan tidak sesuai kriteria');
    }

    // var checkPW = pwValidator.validate(req.body.password);
    // if (checkPW == false) {
    //   throw new Error('Password yang dimasukkan tidak sesuai kriteria');
    // }

    var checkPhone = req.body.phone
      ? phoneValidator.validate(req.body.phone)
      : true;
    if (checkPhone == false) {
      throw new Error('Nomor Telepon yang dimasukkan tidak sesuai kriteria');
    }


    const code = crypto.randomBytes(16).toString('hex');
    const subject = 'Account activation';
    const to_addr = registrant.email;
    const content =
      'Hello,\n\nPlease verify your account by clicking the link:\n' +
      `http://${req.headers.host}/activating/${code}`;
    const datum = {
      description: 'ACCOUNT_ACTIVATION',
      sec_registrant_id: registrant.id,
      code: code
    };

    const sendEmail = await Confirmation.sendEmail({
      subject,
      to_addr,
      content,
      datum
    });
    if (!sendEmail) throw sendEmail;

    return res.json({
      message: `An email for account activation has been sent to ${registrant.email}.`,
      data: registrant
    });
  } catch (err) {
    res.status(401).json({ error: null, message: err.message });
  }
};

exports.activating = async function (req, res) {
  const model_registrant = sec_registrant();
  const model_confirmation = sec_confirmation();
  const model_user = sec_user();

  try {
    const now = moment();

    var confirmation = await model_confirmation.findOne({
      where: { code: req.params.code }
    });
    if (confirmation.status !== ACTIVE) {
      throw new Error('This link is already used');
    }

    var registrant = await model_registrant.findOne({
      where: { id: confirmation.sec_registrant_id }
    });
    if (registrant.is_email_validated) {
      throw new Error('This user has already been verified');
    }

    registrant.is_email_validated = 1;
    registrant.status = DELETED;
    registrant.updated_by = 'SYSTEM';
    registrant.updated_date = now.format();

    const registrantSave = await registrant.save();
    if (!registrantSave) throw registrantSave;

    confirmation.status = DELETED;
    confirmation.updated_by = 'SYSTEM';
    confirmation.updated_date = now.format();

    const confirmationSave = await confirmation.save();
    if (!confirmationSave) throw confirmationSave;

    if (confirmation.status == DELETED) {
      var copy_to_user = {
        name: registrant.name,
        email: registrant.email,
        password: registrant.password,
        phone: registrant.phone,
        status: 1,
        created_date: moment().format(),
        is_email_validated: ACTIVE
      };
      var copy = await model_user.create(copy_to_user);

      return res.json({
        message: 'The account is successfully verified. Please log in.',
        data: copy
      });
    }
  } catch (e) {
    res.status(401).json({
      error: null,
      msg: e.message
    });
  }
};

exports.requestActivation = async function (req, res) {
  const model_user = sec_user();
  const model_registrant = sec_registrant();
  const model_confirmation = sec_confirmation();
  try {
    const email = req.body.email;
    const registrant = await model_registrant.findOne({
      where: {
        email: email,
        is_email_validated: 0,
        status: ACTIVE
      }
    });
    if (!registrant) {
      throw new Error('Email entered is wrong');
    }

    const countdownMsg = await shouldSendingMail(registrant, 'registrant');
    if (countdownMsg) throw new Error(countdownMsg);

    const code = crypto.randomBytes(16).toString('hex');
    const subject = 'Account activation (resend)';
    const to_addr = registrant.email;
    const content =
      'Hello,\n\nPlease verify your account by clicking the link:\n' +
      `http://${req.headers.host}/activating/${code}`;
    const datum = {
      description: 'ACCOUNT_ACTIVATION_RE',
      sec_registrant_id: registrant.id,
      code: code
    };
    const sendEmail = await Confirmation.sendEmail({
      subject,
      to_addr,
      content,
      datum
    });
    if (!sendEmail) throw sendEmail;

    return res.json({
      message: `An email for account activation has been sent to ${registrant.email}.`,
      data: registrant
    });
  } catch (e) {
    res.status(401).json({
      error: null,
      message: e.message
    });
  }
};

exports.forgotPassword = async function (req, res) {
  const model_user = sec_user();
  const model_registrant = sec_registrant();
  const model_confirmation = sec_confirmation();
  try {
    const email = req.body.email;
    const user = await model_user.findOne({
      where: {
        email: email,
        status: ACTIVE
      }
    });

    if (!user) {
      registrant = await model_registrant.findOne({
        where: {
          email: email,
          status: ACTIVE
        }
      });

      if (!registrant) {
        throw new Error('Email entered is wrong or not registered');
      }

      throw new Error('Verify your email to continue');
    }

    const countdownMsg = await shouldSendingMail(user, 'user');
    if (countdownMsg) throw new Error(countdownMsg);

    const code = crypto.randomBytes(16).toString('hex');
    const subject = 'Password change request';
    const to_addr = user.email;
    const content =
      "Hello,\n\nHere's your password change request:\n" +
      `http://${req.headers.host}/update_password/${code}`;
    const datum = {
      description: 'FORGOT_PASSWORD',
      sec_user_id: user.id,
      code: code
    };
    const sendEmail = await Confirmation.sendEmail({
      subject,
      to_addr,
      content,
      datum
    });
    if (!sendEmail) throw sendEmail;

    return res.json({
      message: `An email for check validity password change has been sent to ${user.email}.`
    });
  } catch (e) {
    res.status(401).json({
      error: null,
      message: e.message
    });
  }
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

  if (confirm.status !== ACTIVE) {
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

  const now = moment();

  user.password = sha256(user.email + password + env.USER_SECRET);
  user.updated_by = email;
  user.updated_date = now.format();
  await user.save();

  confirm.status = DELETED;
  confirm.updated_by = email;
  confirm.updated_date = now.format();
  await confirm.save();

  return res.json({
    message: 'Your password updated'
  });
};
