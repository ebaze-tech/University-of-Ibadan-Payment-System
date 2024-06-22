const mysql = require('mysql2');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'TechMaven',
  password: 'Toluwanimi05?',
  database: 'Payment'
})

module.exports = pool.promise();