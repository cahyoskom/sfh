const sec_user = require('../models/sec_user');
const ads_t_order = require('../models/ads_t_order');
const ads_m_rates = require('../models/ads_m_rates');
const ads_m_spot = require('../models/ads_m_spot');
const moment = require('moment');
const isBase64 = require('is-base64');
const { ACTIVE, DELETED } = require('../enums/status.enums');
const { ADMIN, STUDENT } = require('../enums/group.enums');
const { sha256 } = require('../common/sha');
const { Op } = require('sequelize');
const pwValidator = /(?=.{6,}$)/;

exports.findAll = async function (req, res) {
  let filterName = {};

  const { page_item = 10, offset = 0, name = '' } = req.query;
  const q_item = parseInt(page_item);
  const q_offset = parseInt(offset);
  const model_sec_user = sec_user();
  const model_ads_t_order = ads_t_order();
  var data = await model_ads_t_order.findAll({
    attributes: [
      'id',
      ['start_datetime', 'periode_awal'],
      ['end_datetime', 'periode_akhir'],
      ['deal_price', 'tarif'],
      'order_datetime',
      ['order_status', 'status']
    ],
    include:
    {
      model: model_sec_user, as: 'sec_user_model',
      attributes: [
        'name',
        'email',
      ]
    },
  });

  if (name) {
    filterName = { name: { [Op.like]: name } };
  }

  var ads_t_orders = await model_ads_t_order.findAndCountAll({
    where: {
      ...filterName,
      status: 1
    },
    limit: q_item,
    offset: q_offset
  });

  res.json({ dataLength: ads_t_orders.count, data: data, });
};

exports.findOne = async function (req, res) {
  const model_ads_t_order = ads_t_order();
  const model_ads_m_rates = ads_m_rates();
  const model_ads_m_spot = ads_m_spot();


  var data = await model_ads_t_order.findOne({
    where: { id: req.params.id },
    attributes: [
      'id',
      'order_status'
    ],

    include:
    {
      model: model_ads_m_rates, as: 'ads_m_rates_model',
      attributes: [
        'id',
      ],
      include: {
        model: model_ads_m_spot, as: 'ads_m_spot_model',
        attributes: [
          'position',
          'width',
          'height',
        ],
      }
    }
  });

  res.json({ data: data });
};

// exports.create = async function (req, res) {
//   const model_ads_t_order = ads_t_order();
//   // var checkAvatar = isBase64(req.body.avatar, { allowMime: true });
//   // if (!checkAvatar) {
//   //   res.status(401).json({ error: null, message: 'Format gambar tidak sesuai' });
//   // }

//   var new_obj = {
//     name: req.body.name,
//     email: req.body.email,
//     // username: req.body.username,
//     password: sha256(req.body.email + req.body.password + process.env.USER_SECRET),
//     is_email_validated: 1,
//     phone: req.body.phone,
//     is_phone_validated: 0,
//     // avatar: req.body.avatar,
//     auth_provider: 1,
//     is_admin: 0,
//     status: ACTIVE,
//     created_date: moment().format(),
//     created_by: req.body.email
//   };
//   try {
//     var datum = await model_ads_t_order.create(new_obj);
//     res.json({ data: datum });
//   } catch (err) {
//     res.status(411).json({ error: 11, message: err.message });
//   }
// };

// exports.update = async function (req, res) {
//   const model_ads_t_order = ads_t_order();
//   var checkAvatar = isBase64(req.body.avatar, { allowMime: true });
//   // if (!checkAvatar) {
//   //   res.status(401).json({ error: null, message: 'Format gambar tidak sesuai' });
//   // }

//   var update_obj = {
//     name: req.body.name,
//     email: req.body.email,
//     username: req.body.username,
//     is_email_validated: 1,
//     phone: req.body.phone,
//     is_phone_validated: 0,
//     avatar: req.body.avatar,
//     auth_provider: 1,
//     is_admin: req.body.is_admin,
//     status: req.body.status,
//     updated_date: moment().format(),
//     updated_by: req.body.email
//   };
//   console.log(req.body.password);
//   console.log(req.body.re_new_password);

//   if (req.body.password != '' && req.body.new_password != '') {
//     var update_obj = {
//       name: req.body.name,
//       email: req.body.email,
//       username: req.body.username,
//       password: sha256(req.body.email + req.body.password + process.env.USER_SECRET),
//       re_new_password: sha256(req.body.email + req.body.re_new_password + process.env.USER_SECRET),
//       is_email_validated: 1,
//       phone: req.body.phone,
//       is_phone_validated: 0,
//       avatar: req.body.avatar,
//       auth_provider: 1,
//       is_admin: req.body.is_admin,
//       status: req.body.status,
//       updated_date: moment().format(),
//       updated_by: req.body.email
//     };
//   }
//   var pwChecker = req.body.password ? pwValidator.test(req.body.password) : true;
//   if (pwChecker == false) {
//     res.status(401).json({ error: null, message: 'Masukkan Minimal 6 Karakter' });
//   }
//   console.log(pwChecker);
//   if (update_obj.password != update_obj.re_new_password) {
//     res.status(401).json({ error: null, message: 'Password Tidak Sama' });
//   }

//   try {
//     var datum = await model_ads_t_order.update(update_obj, {
//       where: { id: req.params.id }
//     });
//     res.json({ message: 'Data has been updated.' });
//   } catch (err) {
//     res.status(411).json({ error: 11, message: err.message });
//   }
// };

// exports.delete = async function (req, res) {
//   const model_ads_t_order = ads_t_order();
//   var user = await model_ads_t_order.update(
//     {
//       status: DELETED
//     },
//     { where: { id: req.params.id } }
//   );

//   res.json({ message: 'Data berhasil dihapus' });
// };
