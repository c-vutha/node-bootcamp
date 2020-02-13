const express = require("express");
const app = express();
const parser = require("body-parser");

const db = require("./database");
const router = require("./routes");

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use("/api", router);

db.authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    app.listen(4000, res => console.log("Server started"));
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

// http:localhost:3000/api/login
