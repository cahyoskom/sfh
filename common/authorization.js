const sec_token = require('../models/sec_token');
const moment = require('moment');
const roles = require('./roles');
const sec_user = require('../models/sec_user');

module.exports = async (req, res, next) => {
  console.log('================= AUTHORIZATION =================');

  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Token not found!' });
  }

  let split = req.headers.authorization.split('Bearer');
  let sent_token = split[1].trim();

  var token = await sec_token().findOne({
    where: { token: sent_token }
  });

  if (!token) {
    return res.status(401).send({ message: 'Token not found!' });
  }

  var now = moment();
  var expiry_date = moment(token.valid_until);
  isValid = now.isBefore(expiry_date);
  if (!isValid) {
    return res.status(401).send({ message: 'Token already invalid' });
  }

  var user = await sec_user().findOne({
    where: { user_id: token.user_id }
  });

  if (!user) {
    return res.status(401).send({ message: 'User not found!' });
  }

  user.roles = await roles.set(await roles.get(token.user_id));
  req.user = user;

  console.log('================= AUTHORIZATION END =================');
  return next();
};
