const bcrypt = require('bcrypt');
const model = require('./models');

// process.env.JWT_KEY = Get Key from .env file
const jwtKey =
  process.env.JWT_KEY || '123456789054321234567883641349124798127492174921';

exports.home = async (req, res, next) => {
  res.send('<h1>Hello World</h1>');
};

exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const hashPassword = await bcrypt.hash(password, 12);
    const user = await model.createUser(username, hashPassword);
    const token = signToken({ id: user.id });
    res.send({
      message: 'success',
      username: user.username,
      token
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // prepare error
  const err = Error('Incorrect username or password');
  err.code = 401;

  try {
    const user = await model.getUserByUsername(username);
    if (!user) {
      throw err;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw err;
    }
    const token = signToken({ id: user.id });
    res.send({
      message: 'success',
      uid: user.id,
      username: user.username,
      token
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async (req, res, next) => {
  const uid = req.uid;
  try {
    const user = await model.getUser(uid);
    if (!user) {
      const err = Error(`Cannot find user with id ${uid}`);
      err.code = 400;
      throw err;
    }

    // dont return user data with password
    delete user.password;
    res.send(user);
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  const uid = req.uid;
  const newPassword = req.body.password;

  try {
    const user = await model.updatePassword(uid, newPassword);

    // send new token
    const token = signToken({ id: user.id });
    res.send({
      message: 'success',
      uid: uid,
      username: user.username,
      token
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  const uid = req.uid;
  const newUsername = req.body.username;
  const newPassword = req.body.password;

  try {
    const user = await model.updateUser(uid, newUsername, newPassword);
    res.send({
      message: 'success',
      uid: user.id,
      username: user.username
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  const uid = req.uid;

  try {
    await model.deleteUser(uid);
    res.send({
      message: 'success',
      uid: uid
    });
  } catch (error) {
    next(error);
  }
};

const signToken = payload => {
  const jwt = require('jsonwebtoken');

  return jwt.sign(payload, jwtKey, {
    expiresIn: '7d'
  });
};
