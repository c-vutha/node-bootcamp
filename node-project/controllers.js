const bcrypt = require("bcrypt");

const model = require("./models");

exports.root = async (req, res, next) => {
  res.send("Hello World");
};

exports.getUser = async (req, res, next) => {
  try {
    const id = req.payload.id;
    console.log(req.payload);
    const user = await model.getUserById(id);
    console.log(user);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: error
    });
  }
};

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await model.getUser(username);
    const isEqual = await bcrypt.compare(password, user.password);
    if (user && isEqual) {
      // Sign Token
      const token = jwt.sign(
        {
          id: user.id
        },
        jwtKey,
        {
          audience: "com.biz.phumaircon",
          expiresIn: "7d"
        }
      );
      res.send({
        user: user.username,
        token
      });
    } else {
      throw Error("Incorrect username or password");
    }
  } catch (error) {
    res.status(400).send({
      message: error.toString(),
      username,
      password
    });
  }
};

exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    // SHA 256 / SHA 2
    const hashPwd = await bcrypt.hash(password, 12);
    await model.createUser(username, hashPwd);
    res.send({
      message: "success",
      username: username
    });
  } catch (error) {
    res.status(400).send({
      message: error.toString(),
      username,
      password
    });
  }
};

// abc123! 	=> 	askfsafnslafnoafhakbwfkwajbf

// abc123!		=> 	askfsafnslafnoafhakbwfkwajbf
// 123abc!		=> 	fasnfasfnowinfalwnfl
