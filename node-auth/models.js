const db = require('./database');

exports.getUsers = async () => {
  const sql = 'SELECT * FROM USER_ACCOUNT WHERE active = 1';
  return exec(sql);
};

exports.getUser = async id => {
  const sql = 'SELECT * FROM USER_ACCOUNT WHERE active = 1 and id = :id';
  const result = await exec(sql, { id });
  return result[0];
};

exports.getUserByUsername = async username => {
  const sql =
    'SELECT * FROM USER_ACCOUNT WHERE active = 1 and username = :username';
  const users = await exec(sql, { username });
  return users[0];
};

exports.createUser = async (username, password) => {
  let sql =
    'INSERT INTO USER_ACCOUNT (username, password) VALUES (:username, :password)';
  const result = await exec(sql, { username, password }, db.QueryTypes.INSERT);
  sql = 'SELECT * FROM USER_ACCOUNT WHERE id = :id;';
  const users = await exec(sql, { id: result[0] });
  return users[0];
};

exports.updateUser = async (id, username, password) => {
  const sql =
    'UPDATE USER_ACCOUNT SET username = :username, password: password WHERE id = :id;';
  // 'SELECT * FROM USER_ACCOUNT WHERE active = 1 and id = :id;';
  const users = await exec(
    sql,
    { id, username, password },
    db.QueryTypes.UPDATE
  );
  return users[0];
};

exports.updatePassword = async (id, password) => {
  let sql = 'UPDATE USER_ACCOUNT SET password= :password WHERE id = :id;';
  await exec(sql, { id, password });
  sql = 'SELECT * FROM USER_ACCOUNT WHERE id = :id;';
  const users = await exec(sql, { id });
  return users[0];
};

exports.deleteUser = async id => {
  const sql = 'UPDATE USER_ACCOUNT SET active = 0 WHERE id = :id;';
  await exec(sql, { id }, db.QueryTypes.DELETE);
};

const exec = async (sql, params = {}, queryType = db.QueryTypes.SELECT) => {
  const result = await db.query(sql, {
    replacements: params,
    type: queryType
  });
  return result;
};
