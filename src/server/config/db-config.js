const mysql = require('mysql2');

if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

module.exports = pool.promise();
