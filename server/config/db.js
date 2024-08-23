const mysql = require('mysql');
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "ordering"
});

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ordering'
});

module.exports = { db, pool };