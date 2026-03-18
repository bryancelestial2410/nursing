const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

const sslConfig = process.env.DB_CA_CERT
  ? { ca: process.env.DB_CA_CERT }           // Vercel - uses env variable
  : { ca: fs.readFileSync('./ca.pem') };      // Local - uses ca.pem file

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: sslConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('❌ MySQL connection error:', err.message);
    return;
  }
  console.log('✅ MySQL connected!');
  connection.release();
});

module.exports = pool;