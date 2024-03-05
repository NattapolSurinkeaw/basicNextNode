const mysql = require('mysql');

function dbCon() {
  let dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'anime'
  });
  return dbConnection;
}

module.exports = dbCon;