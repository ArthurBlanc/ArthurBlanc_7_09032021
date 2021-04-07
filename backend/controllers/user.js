// Import database connection info
const sql = require("../middleware/database");
// Import "bcrypt" package - A library to help you hash passwords
const bcrypt = require("bcrypt");
// Import "jsonwebtoken" package - Create and verify authentication tokens
const jwt = require("jsonwebtoken");
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
// Route POST - Login
exports.login = (req, res, next) => {
	// Email encryption (AES) with "crypto-js"
	const cryptedEmail = CryptoJS.AES.encrypt(req.body.email, key, { iv: iv }).toString();
	// Check if the user email (encrypted) is in the database
	sql.query("SELECT * FROM users WHERE email= ?", [cryptedEmail], (error, results, rows) => {
		//Si utilisateur trouvé :
		if (results.length > 0) {
			// Compare password hash with database
			bcrypt
				.compare(req.body.password, results[0].password)
				.then((valid) => {
					// Check if password is valid
					if (!valid) {
						return res.status(401).json({ error: "Mot de passe incorrect !" });
					}
					res.status(200).json({
						userId: results[0].id,
						nom: results[0].nom,
						prenom: results[0].prenom,
						admin: results[0].admin,
						email: req.body.email,
						// Create a authentication token with "jsonwebtoken"
						token: jwt.sign({ userId: results[0].id }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "24h" }),
					});
				})
				.catch((error) => res.status(500).json({ error }));
		} else {
			res.status(404).json({
				message: "Utilisateur inconnu.",
			});
		}
	});
};
// Route DELETE - Delete one user
exports.deleteUser = (req, res, next) => {
	let userId = req.params.id;
	sql.query("DELETE FROM users WHERE id = ?", [userId], (error, results, fields) => {
		if (error) throw error;
		return res.status(200).json(results);
	});
};
