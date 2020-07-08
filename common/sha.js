var crypto = require('crypto');

module.exports.sha256 = (data) => {
  return crypto.createHash('sha256').update(data).digest('hex');
};

module.exports.sha1 = (data) => {
  return crypto.createHash('sha1').update(data).digest('hex');
};
