const sequelize = require('sequelize');

const database = new sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_FILE,
  logging: false
});

/**
 * @module sequelize
 * @see sequelize
 */
module.exports = database;
