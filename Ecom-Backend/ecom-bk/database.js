const mysql = require("mysql2/promise");
require('dotenv').config();



const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

async function testConnection() {
  try {
    const result = await db.query('SELECT 1');
    console.log("Database connection successful!!");
  } catch (err) {
    console.log("Database connection failed: ", err.message);
  }
}



testConnection();


module.exports = db;