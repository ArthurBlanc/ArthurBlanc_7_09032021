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
// Route GET - Get all comments of a post
exports.getAllComments = (req, res, next) => {
	let postId = req.params.postId;
	sql.query(
		"SELECT users.id, users.nom, users.prenom, comments.id, comments.content, comments.userId, comments.date, comments.postId FROM users INNER JOIN comments ON users.id = comments.userId WHERE comments.postId = ? ORDER BY comments.date DESC",
		[postId],
		(error, results, fields) => {
			if (error) throw error;
			return res.status(200).json(results);
		}
	);
};
// Route DELETE - Delete one comment
exports.deleteComment = (req, res, next) => {
	let commentId = req.params.id;
	sql.query("DELETE FROM comments WHERE comments.id = ?", [commentId], (error, results, fields) => {
		if (error) throw error;
		return res.status(200).json(results);
	});
};
