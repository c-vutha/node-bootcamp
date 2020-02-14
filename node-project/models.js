const db = require("./database");
const createQuery = "INSERT INTO USER_ACCOUNT VALUES(:username, :password)";

const loginQuery = "SELECT * FROM USER_ACCOUNT WHERE username = :username";
const getUserQuery = "SELECT * FROM USER_ACCOUNT WHERE id = :id";

exports.getUser = async username => {
  const query = await db.query(loginQuery, {
    replacements: {
      username
    },
    type: db.QueryTypes.SELECT
  });
  return query[0];
};
exports.getUserById = async id => {
  const query = await db.query(getUserQuery, {
    replacements: {
      id
    },
    type: db.QueryTypes.SELECT
  });
  return query[0];
};

exports.createUser = async (username, hashPassword) => {
  const query = await db.query(createQuery, {
    replacements: {
      username,
      password: hashPassword
    },
    type: db.QueryTypes.SELECT
  });
  return query;
};
