const { Op } = require('sequelize');
const moment = require('moment');
const crypto = require('crypto');
const { time } = require('console');
const { env } = process;
const passwordValidator = require('password-validator');
const emailValidator = require('email-validator');

const sec_user = require('../models/sec_user');
const sec_registrant = require('../models/sec_registrant');
const sec_token = require('../models/sec_token');
const sec_confirmation = require('../models/sec_confirmation');
const m_param = require('../models/m_param');

const userController = require('./user');
const Confirmation = require('./confirmation');
const { sha256 } = require('../common/sha');
const mailer = require('../common/mailer');
const { beginTransaction } = require('../database');
const { ACTIVE, DEACTIVE, DELETED } = require('../enums/status.enums');
const pwValidator = new passwordValidator().is().min(6);
// .is().max(100).has().uppercase().has().lowercase().has().digits().has().not().spaces();
const phoneValidator = /^(^\+62\s?|^0)(\d{3,4}-?){2}\d{3,4}$/;

async function shouldSendingMail(transaction, flag, filtering, disabling = false) {
  const model_confirmation = sec_confirmation();
  const confirmation = await model_confirmation.findOne({
    where: {
      ...filtering,
      status: ACTIVE
    },
    transaction
  });
  if (!confirmation) return false;

  const timeNow = moment();
  const dateCr = moment(confirmation.created_date);
  const parameter = m_param();
  const DURATION = await parameter.findOne({
    attributes: ['value'],
    where: { name: flag },
    transaction
  });
  dateCr.add(DURATION.value, 'hours');
  if (dateCr < timeNow) {
    if (disabling) {
      confirmation.status = DEACTIVE;
      await confirmation.save({ transaction });
    }

    return false;
  }

  const diffTime = dateCr.diff(timeNow);
  const duration = moment.duration(diffTime);
  const durationStr = moment.utc(duration.asMilliseconds()).format('HH:mm:ss');

  return `Please wait, you need ${durationStr} to resend mail.`;
}

exports.create = async function (req, res) {
  const model_registrant = sec_registrant();
  const model_confirmation = sec_confirmation();
  const model_user = sec_user();
  const transaction = await beginTransaction();

  var new_user = {
    name: req.body.name,
    email: req.body.email,
    password: sha256(req.body.email + req.body.password + process.env.USER_SECRET),
    phone: req.body.phone,
    status: ACTIVE,
    created_date: moment().format()
  };

  try {
    const checkUser = await model_user.findOne({
      where: {
        email: new_user.email
      },
      transaction
    });

    if (checkUser) {
      // note this! we don't care about sec_user status flag, because email should be unique list
      // throw new Error('Your mail already registered, please log in');
      throw new Error('Email sudah terdaftar, silakan login.');
    } else {
      const checkReg = await model_registrant.findOne({
        where: {
          email: new_user.email
        },
        order: [['id', 'DESC']],
        transaction
      });

      if (checkReg) {
        if (checkReg.status == ACTIVE) {
          const checkConfirmation = await model_confirmation.findOne({
            where: {
              sec_registrant_id: checkReg.id
            },
            transaction
          });

          if (checkConfirmation) {
            if (checkConfirmation.status == ACTIVE) {
              const alreadyValidLink = await shouldSendingMail(
                transaction,
                'MAIL_INTERVAL_VERIFICATION',
                { sec_registrant_id: checkReg.id },
                false
              );

              if (alreadyValidLink) {
                // throw new Error('Please check mail box for visit our activation link')
                throw new Error(
                  'Email sudah terdaftar. Silakan cek email untuk melakukan aktivasi link.'
                );
              }
            }
            res.status(401).json({
              error: 401001,
              // message: 'Please do request activation link',
              message: 'Harap melakukan aktivasi link.'
            });
            return;
          }
        }
      }
    }

    var checkEmail = emailValidator.validate(req.body.email);
    if (checkEmail == false) {
      throw new Error('Email yang dimasukkan tidak sesuai kriteria');
    }

    var checkPW = pwValidator.validate(req.body.password);
    if (checkPW == false) {
      throw new Error('Password yang dimasukkan tidak sesuai kriteria');
    }

    var checkPhone = req.body.phone ? phoneValidator.test(req.body.phone) : true;
    if (checkPhone == false) {
      throw new Error('Nomor telepon yang dimasukkan tidak sesuai kriteria');
    }

    const registrant = await model_registrant.create(new_user, { transaction });
    if (!registrant) throw registrant;

    const code = crypto.randomBytes(16).toString('hex');
    const subject = 'Account activation';
    const to_addr = registrant.email;
    const url = env.APP_BASEURL || req.headers.host;
    const content =
      'Hello,\n\nPlease verify your account by clicking the link:\n' +
      `${url}/confirmation?q=activating&code=${code}`;
    const datum = {
      description: 'ACCOUNT_ACTIVATION',
      sec_registrant_id: registrant.id,
      code: code
    };

    const sendEmail = await Confirmation.sendEmail(transaction, {
      subject,
      to_addr,
      content,
      datum
    });
    if (!sendEmail) throw sendEmail;

    await transaction.commit();
    return res.json({
      // message: `An email for account activation has been sent to ${registrant.email}.`,
      message: `Email untuk aktivasi akun sudah dikirimkan ke ${registrant.email}.`,
      data: registrant
    });
  } catch (err) {
    await transaction.rollback();
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
      // throw new Error('This link is already used');
      throw new Error('Link sudah digunakan.');
    }

    var registrant = await model_registrant.findOne({
      where: { id: confirmation.sec_registrant_id }
    });
    if (registrant.is_email_validated) {
      // throw new Error('This user has already been verified');
      throw new Error('Pengguna sudah diverifikasi.');
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
        // message: 'The account is successfully verified. Please log in.',
        message: 'Akun berhasil diverifikasi. silakan login.',
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
  const transaction = await beginTransaction();

  try {
    const email = req.body.email;
    const registrant = await model_registrant.findOne({
      where: {
        email: email,
        is_email_validated: 0,
        status: ACTIVE
      },
      transaction
    });
    if (!registrant) {
      // throw new Error('Email entered is wrong');
      throw new Error('Email yang dimasukkan salah.');
    }

    const countdownMsg = await shouldSendingMail(transaction, 'MAIL_INTERVAL_VERIFICATION', {
      sec_registrant_id: registrant.id
    });
    if (countdownMsg) throw new Error(countdownMsg);

    const code = crypto.randomBytes(16).toString('hex');
    const subject = 'Account activation (resend)';
    const to_addr = registrant.email;
    const url = env.APP_BASEURL || req.headers.host;
    const content =
      'Hello,\n\nPlease verify your account by clicking the link:\n' +
      `${url}/confirmation?q=activating&code=${code}`;
    const datum = {
      description: 'ACCOUNT_ACTIVATION_RE',
      sec_registrant_id: registrant.id,
      code: code
    };
    const sendEmail = await Confirmation.sendEmail(transaction, {
      subject,
      to_addr,
      content,
      datum
    });
    if (!sendEmail) throw sendEmail;

    await transaction.commit();
    return res.json({
      // message: `An email for account activation has been sent to ${registrant.email}.`,
      message: `Email untuk aktivasi akun sudah dikirimkan ke ${registrant.email}.`,
      data: registrant
    });
  } catch (e) {
    await transaction.rollback();
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
  const transaction = await beginTransaction();

  try {
    const email = req.body.email;
    const user = await model_user.findOne({
      where: {
        email: email,
        status: ACTIVE
      },
      transaction
    });

    if (!user) {
      registrant = await model_registrant.findOne({
        where: {
          email: email,
          status: ACTIVE
        },
        transaction
      });

      if (!registrant) {
        // throw new Error('Email entered is wrong or not registered');
        // throw new Error('Email yang dimasukkan salah atau belum terdaftar.');
        console.log(`[WARN] someone with email: "${email}" is not a "registrant"`);
        throw new Error('Email yang anda masukkan salah');
      }

      // throw new Error('Verify your email to continue');
      // throw new Error('Harap Verifikasi Email Terlebih Dahulu.');
      console.log(`[WARN] someone with email: "${email}" is not a "user"`);
      throw new Error('Email akan terkirim apabila telah terdaftar');
    }

    const countdownMsg = await shouldSendingMail(transaction, 'MAIL_INTERVAL_FORGOT_PASSWORD', {
      sec_user_id: user.id
    });
    if (countdownMsg) throw new Error(countdownMsg);

    const code = crypto.randomBytes(16).toString('hex');
    const subject = 'Password change request';
    const to_addr = user.email;
    const url = env.APP_BASEURL || req.headers.host;
    const content =
      "Hello,\n\nHere's your password change request:\n" +
      `${url}/confirmation?q=update_password&code=${code}`;
    const datum = {
      description: 'FORGOT_PASSWORD',
      sec_user_id: user.id,
      code: code
    };
    const sendEmail = await Confirmation.sendEmail(transaction, {
      subject,
      to_addr,
      content,
      datum
    });
    if (!sendEmail) throw sendEmail;

    await transaction.commit();
    return res.json({
      // message: `An email for check validity password change has been sent to ${user.email}.`
      // message: `Email untuk validasi perubahan password sudah dikirimkan ke ${user.email}.`,
      message: 'Email akan terkirim apabila telah terdaftar'
    });
  } catch (e) {
    await transaction.rollback();
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
  // const email = req.body.email;
  const password = req.body.password;

  const confirm = await model_confirmation.findOne({
    where: { code: code }
  });
  if (!confirm) {
    return res.status(401).json({
      error: null,
      // message: 'Code is not found please request another password change.',
      message: 'Token tidak ditemukan, harap request perubahan password lagi.'
    });
  }

  if (confirm.status !== ACTIVE) {
    return res.status(401).json({
      error: null,
      message: 'Token tidak ditemukan, harap request perubahan password lagi.'
    });
  }

  const user = await model_user.findOne({
    where: { id: confirm.sec_user_id, status: ACTIVE }
  });

  if (!user) {
    return res.status(401).json({
      error: null,
      // message: 'Invalid account: mismatch code',
      message: 'Akun anda tidak ditemukan.'
    });
  }

  const now = moment();

  user.password = sha256(user.email + password + env.USER_SECRET);
  user.updated_by = user.email;
  user.updated_date = now.format();
  await user.save();

  confirm.status = DELETED;
  confirm.updated_by = user.email;
  confirm.updated_date = now.format();
  await confirm.save();

  return res.json({
    // message: 'Your password updated',
    message: 'Password berhasil diperbarui.'
  });
};

exports.checkEmail = async function (req, res) {
  var email = req.query.email;
  const model_user = sec_user();
  var user = await model_user.findOne({
    where: {
      email: email
    }
  });
  if (user) {
    return res.status(401).json({
      message: 'Email sudah terdaftar'
    });
  } else {
    const model_registrant = sec_registrant();
    var registrant = await model_registrant.findOne({
      where: {
        email: email,
        status: ACTIVE
      }
    });
    if (registrant) {
      return res.status(401).json({
        message: 'Email sudah terdaftar'
      });
    }
  }
  return res.status(200).json({
    message: 'Email dapat digunakan'
  });
};
