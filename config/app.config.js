require('dotenv').config();

const { name, version } = require('../package.json');
module.exports = {
  name,
  version,
  uploaddir: './files'
};
