const path = require('path');
const { parsed } = require('dotenv').config();
module.exports = {
  dbOptions: {
    database: parsed.DB_DATABASE,
    username: parsed.DB_USERNAME,
    password: parsed.DB_PASSWORD,
    dialect: parsed.DB_DIALECT,
    host: parsed.DB_HOST,
    port: parsed.DB_PORT,
    logging: false
  },
  options: {
    type: 'js',
    dir: path.join(
      __dirname.toString(),
      'models',
      new Date().getTime().toString()
    )
  }
};
