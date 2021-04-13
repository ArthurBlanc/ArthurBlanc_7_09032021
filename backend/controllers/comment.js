// Import database connection info
const sql = require("../middleware/database");

// Route POST - Create one comment
exports.createComment = (req, res, next) => {
	let userId = req.body.userId;
	let postId = req.params.postId;
	let commentContent = req.body.content;
	sql.query("INSERT INTO comments VALUES (NULL, ?, ?, ?, NOW())", [userId, postId, commentContent], (error, results, fields) => {
		if (error) throw error;
		return res.status(201).json({ message: "Votre commentaire a été publié !" });
	});
};
