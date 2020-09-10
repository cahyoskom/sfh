const moment = require('moment');
const log_audit = require('../models/log_audit');
const { Op } = require('sequelize');
const { query } = require('express');

exports.getData = async function (req, res) {
  const model_audit = log_audit();
  // var audit = await model_audit.findAll({
  //   order: [['id', 'ASC']]
  // });

  console.log('start_Date === ' + moment(req.query.start_date).format());
  console.log('end_Date === ' + moment(req.query.end_date).format());
  console.log('Email === ' + req.query.email);
  console.log('Action === ' + req.query.action);
  console.log('page_item === ' + req.query.page_item);
  console.log('offset === ' + req.query.offset);

  const q_action = req.query.action;
  const q_email = req.query.email;
  const q_start_date = req.query.start_date;
  const q_end_date = req.query.end_date;
  const q_item = parseInt(req.query.page_item);
  const q_offset = parseInt(req.query.offset);

  if (q_action || q_email || q_start_date || q_end_date || q_item) {
    var audit = await model_audit.findAll({
      limit: q_item,
      offset: q_offset
    });

    if (q_action && q_email && q_start_date && q_end_date) {
      var audit = await model_audit.findAll({
        where: {
          [Op.and]: [
            { action: q_action },
            { sec_user_email: { [Op.like]: q_email } },
            {
              action_date: {
                [Op.between]: [moment(q_start_date).add(1, 'day'), moment(q_end_date).add(1, 'day')]
              }
            }
          ]
        },
        limit: q_item,
        offset: q_offset
      });
    } else if (q_action && q_email) {
      var audit = await model_audit.findAll({
        where: {
          [Op.and]: [{ action: q_action }, { sec_user_email: { [Op.like]: q_email } }]
        },
        limit: q_item,
        offset: q_offset
      });
    } else if (q_action && q_start_date && q_end_date) {
      var audit = await model_audit.findAll({
        where: {
          [Op.and]: [
            { action: q_action },
            {
              action_date: {
                [Op.between]: [moment(q_start_date).add(1, 'day'), moment(q_end_date).add(1, 'day')]
              }
            }
          ]
        },
        limit: q_item,
        offset: q_offset
      });
    } else if (q_email && q_start_date && q_end_date) {
      var audit = await model_audit.findAll({
        where: {
          [Op.and]: [
            { sec_user_email: { [Op.like]: q_email } },
            {
              action_date: {
                [Op.between]: [moment(q_start_date).add(1, 'day'), moment(q_end_date).add(1, 'day')]
              }
            }
          ]
        },
        limit: q_item,
        offset: q_offset
      });
    } else if (q_action) {
      var audit = await model_audit.findAll({
        where: { action: q_action },
        limit: q_item,
        offset: q_offset
      });
    } else if (q_email) {
      var audit = await model_audit.findAll({
        where: { sec_user_email: { [Op.like]: q_email } },
        limit: q_item,
        offset: q_offset
      });
    } else if (q_start_date && req.query.end_date) {
      var audit = await model_audit.findAll({
        where: {
          action_date: {
            [Op.between]: [moment(q_start_date).add(1, 'day'), moment(q_end_date).add(1, 'day')]
          }
        },
        limit: q_item,
        offset: q_offset
      });
    }
  }

  const allData = await model_audit.findAll();

  const dataLength = allData.length;

  let is_admin = false;
  if (req.user.is_admin == 1) {
    is_admin = true;
  }

  //console.log(dataLength);
  console.log('Test Audit');

  res.json({ data: audit, dataLength: dataLength, is_admin: is_admin });
};
