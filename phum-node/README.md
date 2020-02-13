# Init project

```
npm init -y
```

# Install :

```
npm install 'library'
```

- ex: npm install express

# Create express server:

```
const express = require("express");
	const app = express();
	const path = require("path");

	app.listen(4000, res => console.log("Server started"));
```

# Create Get Route ('/hello')

```
app.get('/hello', (req, res, next) => {
	res.send('Hello');
})
```

# Create Post Route ('/hello/:name')

```
app.post('/hello/:name', (req, res, next) => {
	const name = req.params.name;
	res.send('Hello ' + name);
})
```

# Redirect (to google.com)

```
res.redirect('www.google.com');
```

# Data from Request

- req.params ('/hello:name')

  - http://localhost:3000/hello/vutha

- req.query ('/hello?name=vutha')

  ```
  app.get('/hello', (req, res, next) => { const name = req.query.name; res.send('Hello ' + name); })
  ```

- POST method

  ```
  POST: {"name": "vutha"}
  app.post('/hello', (req, res, next) => {
  const json = req.body;
  const obj = JSON.parse(json);
  res.send('Hello ' + obj.name);
  })
  ```

# Static Files

## Use for sending files or host static website

````

app.use("/web", express.static("www"));

```

# Date : 12 / 02 / 2020

# Install Sequelize (Database Connection Library)

```

npm install sequelize

```

# Install Database Driver

```

# One of the following:

$ npm install --save pg pg-hstore 	# Postgres
$ npm install --save mysql2 # mysql
$ npm install --save mariadb 		# mariadb
$ npm install --save sqlite3 # sqlite
\$ npm install --save tedious # Microsoft SQL Server

```

# Setup Connection

```

const Sequelize = require('sequelize');

// database type MS SQL Server
// database name: node_db
// user database: sa
// password: 123
const sequelize = new Sequelize('node_db', 'sa', '123', {
host: 'localhost',
dialect: 'mssql' /_ one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' _/
});

module.exports = sequelize;

```

# Test Connection (in app.js)

```

sequelize
.authenticate()
.then(() => {
console.log('Connection has been established successfully.');

    // Start Server if Can Connect to database
    app.listen(4000, res => console.log("Server started"));

})
.catch(err => {
console.error('Unable to connect to the database:', err);
});

```

# Execute Database Query

```

const query = await db.query(
"SELECT \* FROM USER_ACCOUNT WHERE username = :username and password = :password",
{
replacements: {
username,
password
},
type: db.QueryTypes.SELECT
}
);

```

return query;

```

[
{ username: 'vutha', password: '123' }
]

```

```
````
