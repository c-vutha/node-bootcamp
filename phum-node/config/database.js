const Sequelize = require("sequelize");

// Option 1: Passing parameters separately
const sequelize = new Sequelize("node_db", "sa", "123", {
  host: "localhost",
  dialect: "mssql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  //   logging: false
});

module.exports = sequelize;

// Option 2: Passing a connection URI
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');
