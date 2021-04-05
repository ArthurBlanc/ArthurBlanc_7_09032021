// Import "mysql" package - A node.js driver for mysql.
const mysql = require("mysql");
// Import "dotenv" package - Loads environment variables from .env file
const dotenv = require("dotenv").config();

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

connection.connect(function (error) {
	if (error) {
		return console.error("error: " + error.message);
	}

	console.log("Connection à la base de donnée réussie !");
});

module.exports = connection;
