const db = require("../config/database");

const loginQuery =
  "SELECT * FROM USER_ACCOUNT WHERE username = :username and password = :password";
const createQuery = "INSERT INTO USER_ACCOUNT VALUES(:username, :password)";

exports.getUser = async (username, password) => {
  const query = await db.query(loginQuery, {
    replacements: {
      username,
      password
    },
    type: db.QueryTypes.SELECT
  });
  return query[0];
};

exports.createUser = async (username, password) => {
  const query = await db.query(createQuery, {
    replacements: {
      username,
      password
    },
    type: db.QueryTypes.SELECT
  });
  return query;
};
