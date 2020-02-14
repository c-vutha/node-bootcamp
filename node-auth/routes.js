const express = require('express');
const router = express.Router();
const controller = require('./controllers');
const auth = require('./auth');

router.get('/', controller.home);

router.post('/login', controller.login);
router.post('/signup', controller.signup);
// router.post('/user/update', auth, controller.updateProfile);
router.post('/user/resetpassword', auth, controller.resetPassword);
router.get('/user/delete', auth, controller.deleteUser);
router.post('/user/delete', auth, controller.deleteUser);
router.get('/user', auth, controller.getUser);
router.post('/user', auth, controller.getUser);

// Route 404 Not Found
router.use((req, res, next) => {
  const err = Error('API Not Found');
  err.code = 404;
  next(err);
});

// Route Error
router.use((err, req, res, next) => {
  console.log(err);
  const message = {
    message: err.message || 'Unexpected Error',
    code: err.code || 500,
    path: req.path,
    method: req.method
  };
  res.send(message);
});

module.exports = router;
