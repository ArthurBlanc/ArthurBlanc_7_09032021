// Import database connection info
const sql = require("../middleware/database");

// Route POST - Create one post
exports.createPost = (req, res, next) => {
	let userId = req.body.userId;
	let postContent = req.body.content;
	sql.query(`INSERT INTO posts VALUES (NULL, ?, ?, NOW())`, [userId, postContent], (error, results, fields) => {
		if (error) throw error;
		return res.status(201).json({ message: "Votre post a été publié !" });
	});
};
