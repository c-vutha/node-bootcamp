const express = require("express");
const app = express();
const parser = require("body-parser");
const path = require("path");
const db = require("./config/database");
const authController = require("./controllers/auth");

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("<h2>Hello World</h2>");
});

app.post("/login", authController.login);
app.post("/signup", authController.signup);

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(4000, res => console.log("Server started"));
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
