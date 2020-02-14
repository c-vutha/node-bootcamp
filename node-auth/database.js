const sequelize = require('sequelize');

const database = new sequelize({
  dialect: 'sqlite',
  storage: 'demo.db',
  logging: false
});

/**
 * @module sequelize
 * @see sequelize
 */
module.exports = database;
