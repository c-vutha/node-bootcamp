const User = require("../models/user_account");

exports.login = async (req, res, next) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const users = await User.getUser(username, password);
    //   const notifications = await Notification.getNotification(userid);
    //   res.send({
    //     users: users,
    //     notifications: notifications
    //   });
    res.send(users);
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  const done = await User.createUser(username, password);
  res.send(done);
};
