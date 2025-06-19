const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

module.exports = pool;

console.log(process.env.DB_HOST, process.env.DB_USER);

async function checkDbConnection() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.ping();
    console.log('MySQL connection successful!');
  } catch (err) {
    console.error('MySQL connection failed:', err.message);
  } finally {
    if (connection) connection.release();
  }
}

checkDbConnection();
