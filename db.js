const mysql = require('mysql2');
const fs = require('fs');
require('dotenv').config();

let sslConfig;

try {
  if (process.env.DB_CA_CERT) {
    // Vercel - uses env variable
    sslConfig = { ca: process.env.DB_CA_CERT };
    console.log('✅ Using DB_CA_CERT from environment variable');
  } else {
    // Local - uses ca.pem file
    sslConfig = { ca: fs.readFileSync('./ca.pem') };
    console.log('✅ Using ca.pem from local file');
  }
} catch (err) {
  console.error('❌ SSL config error:', err.message);
  // Fallback: try without SSL (only for testing)
  sslConfig = { rejectUnauthorized: false };
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
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
    console.error('❌ DB_HOST:', process.env.DB_HOST);
    console.error('❌ DB_USER:', process.env.DB_USER);
    console.error('❌ DB_NAME:', process.env.DB_NAME);
    console.error('❌ DB_PORT:', process.env.DB_PORT);
    console.error('❌ DB_CA_CERT exists:', !!process.env.DB_CA_CERT);
    return;
  }
  console.log('✅ MySQL connected successfully!');
  connection.release();
});

module.exports = pool;