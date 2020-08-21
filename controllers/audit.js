const log_audit = require('../models/log_audit');
const { Op } = require('sequelize');

exports.getData = async function (req, res) {
  const model_audit = log_audit();
  var audit = await model_audit.findAll();

  console.log('Test Audit');
  res.json({ data: audit });
};

exports.getFilter = async function (req, res) {
  const model_audit = log_audit();

  console.log(req.query);

  if (req.query.action && req.query.email && req.query.date) {
    var audit = await model_audit.findAll({
      where: {
        [Op.and]: [
          { action: req.query.action },
          { sec_user_email: { [Op.like]: req.query.email } },
          { action_date: req.query.date }
        ]
      }
    });
  } else if (req.query.action && req.query.email) {
    var audit = await model_audit.findAll({
      where: {
        [Op.and]: [
          { action: req.query.action },
          { sec_user_email: { [Op.like]: req.query.email } }
          //{ action_date: req.query.date }
        ]
      }
    });
  } else if (req.query.action && req.query.date) {
    var audit = await model_audit.findAll({
      where: {
        [Op.and]: [{ action: req.query.action }, { action_date: req.query.date }]
      }
    });
  } else if (req.query.email && req.query.date) {
    var audit = await model_audit.findAll({
      where: {
        [Op.and]: [
          { sec_user_email: { [Op.like]: req.query.email } },
          { action_date: req.query.date }
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
  } else if (req.query.date) {
    var audit = await model_audit.findAll({
      where: { action_date: req.query.date }
    });
  }

  res.json({ data: audit });
};
