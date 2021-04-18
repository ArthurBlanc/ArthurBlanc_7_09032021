// Import database connection info
const sql = require("../middleware/database");

// Route PUT - Create thumb
exports.createThumb = (req, res, next) => {
	let postId = req.params.id;
	let userId = req.body.userId;
	if (req.body.thumb == 1) {
		sql.query("INSERT INTO Thumbs VALUES (NULL, ?, ?, 1, 0)", [userId, postId], (error, results, fields) => {
			if (error) throw error;
			sql.query("UPDATE posts SET likes = likes + 1 WHERE id = ?", [postId], (error, results, fields) => {
				if (error) throw error;
			});
			return res.status(200).json(results);
		});
	} else if (req.body.thumb == -1) {
		sql.query("INSERT INTO Thumbs VALUES (NULL, ?, ?, 0, 1)", [userId, postId], (error, results, fields) => {
			if (error) throw error;
			sql.query("UPDATE posts SET dislikes = dislikes + 1 WHERE id = ?", [postId], (error, results, fields) => {
				if (error) throw error;
			});
			return res.status(200).json(results);
		});
	}
};
