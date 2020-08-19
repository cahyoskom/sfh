const log_audit = require('../models/log_audit');

exports.getData = async function (req, res) {
  const model_audit = log_audit();
  var audit = await model_audit.findAll();

  console.log('Test Audit')
  res.json({ data: audit });
};
