const { Sequelize } = require('sequelize');
const db_config = require('./config/db.config');

let db;

module.exports.connectDB = async () => {
     const client = new Sequelize(db_config);
     try {
        await client.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }

      db=client;
}

module.exports.getDB = async() => {
    return db;
}

module.exports.sequelize = () => {
    return db;
}
