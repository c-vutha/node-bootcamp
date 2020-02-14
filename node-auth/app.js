const express = require('express');
const app = express();
const parser = require('body-parser');
const db = require('./database');
const router = require('./routes');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(router);

db.authenticate()
  .then(res => {
    // get PORT from .env file
    const port = process.env.PORT || 3000;
    app.listen(port, res => {
      console.log(`Server start at http://localhost:${port}`);
    });
  })
  .catch(err => console.log(err));

module.exports = app;
