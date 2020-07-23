require('dotenv').config();

const { env } = process;
module.exports = {
  host: env.DB_HOST,
  port: parseInt(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD == '' ? null : env.DB_PASSWORD,
  database: env.DB_DATABASE,
  dialect: env.DB_DIALECT,
  timestamps: false,
  logging: env.NODE_ENV == 'production' ? false : console.log,
  pool: {
    max: parseInt(env.DB_POOL_MAX || 5),
    min: parseInt(env.DB_POOL_MIN || 0),
    acquire: parseInt(env.DB_POOL_ACQUIRE || 30000),
    idle: parseInt(env.DB_POOL_IDLE || 10000)
  }
};
