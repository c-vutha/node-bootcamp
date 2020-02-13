const jwt = require("jsonwebtoken");

const jwtKey = "sanfksbafkbaskfbkasjbfkasbfkasbfksabfksabfksbaf";

const authToken = (req, res, next) => {
  const appid = req.body.appid;
  const auth = req.headers.authorization;
  console.log(auth);
  //   const host = req.host;

  const token = auth.split(" ")[1];
  console.log(token);
  const payload = jwt.verify(token, jwtKey, {
    audience: appid
  });
  if (payload) {
    req.payload = payload;
    next();
  } else {
    res.status(401).send({
      message: "Invalid token"
    });
  }
};

module.exports = authToken;
