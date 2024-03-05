const { json } = require('body-parser');
const { query } = require('express');
const mysql = require('mysql');

let dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'anime'
});

class DBconnect {
  getAll(table) {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM ' + table, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  getById(table, value) {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM ' + table + ' WHERE id = ?', [value] , (error, results) => {
        if(error) {
          reject(error);
        } else {
          resolve(results);
        }
      })
    })
  }

  getWhere(table, where) {
    return new Promise((resolve, reject) => {
      dbConnection.query('SELECT * FROM '+ table + ' WHERE '+ where, (error, results) => {
        if(error) {
          reject(error);
        } else {
          resolve(results);
        }
      })
    })
  }

  inSertData(table, columns, values) {
    return new Promise((resolve, reject) => {
      // สร้างคำสั่ง SQL INSERT โดยใช้ชื่อ column และ placeholder ที่สร้างขึ้นมา
      const sql = `INSERT INTO ${table} (${columns}) VALUES (${values})`;

      // Execute SQL query
      dbConnection.query(sql, Object.values(values), (error, results) => {
          if (error) {
              reject(error);
          } else {
              resolve(results);
          }
      });
    });
  }

  updataData(table, columns, values, where) {
    return new Promise((resolve, reject) => {
      let updateColumns = '';
      for (let i = 0; i < columns.length; i++) {
        updateColumns += `${columns[i]} = ${values[i]}, `;
      }
      updateColumns = updateColumns.slice(0, -2); 
      const sql = `UPDATE ${table} SET ${updateColumns} WHERE ${where}`
      dbConnection.query(sql, (error, results) => {
        if( error) {
          reject(error);
        } else {
          resolve(results);
        }
      })
    })
  }

  // inSert(table, where, value) {
  //   const 
  // }
}

module.exports = DBconnect;