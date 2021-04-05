// Import database connection info
const sql = require("../middleware/database");
// Import "bcrypt" package - A library to help you hash passwords
const bcrypt = require("bcrypt");
// Import "crypto-js" package - JavaScript library of crypto standards
const CryptoJS = require("crypto-js");
// Import "dotenv" package - Loads environment variables from .env file
const dotenv = require("dotenv").config();
// Import "validator" package - String validation and sanitization
const validator = require("validator");

// Import key and iv form .env
const key = CryptoJS.enc.Hex.parse(`${process.env.CRYPTOJS_SECRET_KEY}`);
const iv = CryptoJS.enc.Hex.parse(`${process.env.CRYPTOJS_SECRET_IV}`);

// Route POST - Sign Up
exports.signup = (req, res, next) => {
	// Check if the email is valid with "validator"
	if (!validator.isEmail(req.body.email)) {
		return res.status(401).json({ message: "Votre email est invalide !" });
	}
	// Check if the password is string with "validator"
	if (!validator.isStrongPassword(req.body.password)) {
		return res
			.status(401)
			.json({ message: "Votre mot de passe n'est pas assez fort ! Il doit contenir au moins 8 caractères dont au moins une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial." });
	}
	// Email encryption (AES) with "crypto-js"
	const cryptedEmail = CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();
	sql.query("SELECT * FROM users WHERE email = ?", [cryptedEmail], (error, results, rows) => {
		if (error) throw error;
		//Si email deja utilisé
		if (results.length > 0) {
			res.status(401).json({
				message: "Email non disponible.",
			});
			//Si email disponible
		} else {
			// Password encryption with "bcrypt"
			bcrypt.hash(req.body.password, 10).then((hash) => {
				let prenom = req.body.prenom;
				let nom = req.body.nom;
				let password = hash;
				sql.query("INSERT INTO users VALUES (NULL, ?, ?, ?, ?, 0)", [prenom, nom, cryptedEmail, password], (error, results, fields) => {
					if (error) throw error;
					return res.status(201).json({ message: "Votre compte a été créé !" });
				});
			});
		}
	});
};
