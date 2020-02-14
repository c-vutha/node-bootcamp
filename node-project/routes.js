const express = require("express");
const router = express.Router();
const auth = require("express-basic-auth");
const authToken = require("./jwt");

const basicAuth = auth({
  users: { admin: "supersecret" }
});

const controller = require("./controllers");

// router.use(
//   auth({
//     users: { admin: "supersecret" }
//   })
// );

router.get("/", basicAuth, controller.root);
router.get("/user", authToken, controller.getUser);

router.post("/login", controller.login);
router.post("/signup", controller.signup);

module.exports = router;
