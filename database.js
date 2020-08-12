const { Sequelize } = require('sequelize');
const db_config = require('./config/db.config');

let db;
module.exports.connectDB = async () => {
  const client = new Sequelize(db_config);
  try {
    await client.authenticate();
    console.log('Database: Connection has been established successfully.');
    client.sync();
  } catch (error) {
    console.error('Database:', error);
  }

  db = client;
};

module.exports.getDB = async () => {
  return db;
};

module.exports.sequelize = () => {
  return db;
};

module.exports.beginTransaction = () => {
  return db.transaction();
};
