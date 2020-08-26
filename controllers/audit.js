const moment = require('moment');
const log_audit = require('../models/log_audit');
const { Op } = require('sequelize');

exports.getData = async function (req, res) {
  const model_audit = log_audit();
  var audit = await model_audit.findAll();

  console.log('start_Date === ' + moment(req.query.start_date).format());
  console.log('end_Date === ' + moment(req.query.end_date).format());
  console.log('Email === ' + req.query.email);
  console.log('Action === ' + req.query.action);

  if (req.query.action && req.query.email && req.query.start_date && req.query.end_date) {
    var audit = await model_audit.findAll({
      where: {
        [Op.and]: [
          { action: req.query.action },
          { sec_user_email: { [Op.like]: req.query.email } },
          {
            action_date: {
              [Op.between]: [
                moment(req.query.start_date).add(1, 'day'),
                moment(req.query.end_date).add(1, 'day')
              ]
            }
          }
        ]
      }
    });
  } else if (req.query.action && req.query.email) {
    var audit = await model_audit.findAll({
      where: {
        [Op.and]: [{ action: req.query.action }, { sec_user_email: { [Op.like]: req.query.email } }]
      }
    });
  } else if (req.query.action && req.query.start_date && req.query.end_date) {
    var audit = await model_audit.findAll({
      where: {
        [Op.and]: [
          { action: req.query.action },
          {
            action_date: {
              [Op.between]: [
                moment(req.query.start_date).add(1, 'day'),
                moment(req.query.end_date).add(1, 'day')
              ]
            }
          }
        ]
      }
    });
  } else if (req.query.email && req.query.start_date && req.query.end_date) {
    var audit = await model_audit.findAll({
      where: {
        [Op.and]: [
          { sec_user_email: { [Op.like]: req.query.email } },
          {
            action_date: {
              [Op.between]: [
                moment(req.query.start_date).add(1, 'day'),
                moment(req.query.end_date).add(1, 'day')
              ]
            }
          }
        ]
      }
    });
  } else if (req.query.action) {
    var audit = await model_audit.findAll({
      where: { action: req.query.action }
    });
  } else if (req.query.email) {
    var audit = await model_audit.findAll({
      where: { sec_user_email: { [Op.like]: req.query.email } }
    });
  } else if (req.query.start_date && req.query.end_date) {
    var audit = await model_audit.findAll({
      where: {
        action_date: {
          [Op.between]: [
            moment(req.query.start_date).add(1, 'day'),
            moment(req.query.end_date).add(1, 'day')
          ]
        }
      }
    });
  }

  console.log('Test Audit');
  res.json({ data: audit });
};
