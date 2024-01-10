const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
});

pool.getConnection((err) => {
  if (err) {
    console.log(err);
  }
});

module.exports = pool;
