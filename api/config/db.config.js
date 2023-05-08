const mysql = require("mysql");
require('dotenv').config()

// create here mysql connection
const isLocal = true;
let dbConn = null;

if (isLocal) {
  dbConn = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });
} else {
  dbConn = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    multipleStatements: true,
  });
}

dbConn.getConnection(function (error) {
  if (error) {
    console.log("Error while connecting to the database : ")
    console.log(error);
  }
  else {
    console.log("Database Connected Successfully!!!");
  }
});

module.exports = dbConn;
