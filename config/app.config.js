require('dotenv').config();
module.exports = {
  name: process.env.npm_package_name,
  version: process.env.npm_package_version,
  uploaddir: './files'
};
