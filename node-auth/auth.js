const jwt = require('jsonwebtoken');
const jwtKey =
  process.env.JWT_KEY || '123456789054321234567883641349124798127492174921';

const isAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || req.body.token;
    const token = authHeader.startsWith('Bearer')
      ? authHeader.split(' ')[1]
      : authHeader;

    // prepare error
    const err = Error('Invalid token');
    err.code = 401;
    if (!token) {
      throw err;
    }
    const payload = jwt.verify(token, jwtKey, {});
    if (!payload) {
      throw err;
    }
    console.log(payload);
    req.uid = payload.id;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isAuth;
