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
// Route GET - Get all the posts
exports.getAllPosts = (req, res, next) => {
	sql.query("SELECT users.nom, users.prenom, posts.id, posts.userId, posts.content, posts.date AS date FROM users INNER JOIN posts ON users.id = posts.userId ORDER BY date DESC", (error, results, fields) => {
		if (error) throw error;
		return res.status(200).json(results);
	});
};
// Route GET - Get one post
exports.getOnePost = (req, res, next) => {
	let postId = req.params.id;
	sql.query("SELECT users.nom, users.prenom, posts.id, posts.userId, posts.content, posts.date AS date FROM users INNER JOIN posts ON users.id = posts.userId WHERE posts.id = ?", [postId], (error, results, fields) => {
		if (error) throw error;
		return res.status(200).json(results);
	});
};
// Route DELETE - Delete one post
exports.deletePost = (req, res, next) => {
	let postId = req.params.id;
	sql.query("DELETE FROM posts WHERE id = ?", [postId], (error, results, fields) => {
		if (error) throw error;
		return res.status(200).json(results);
	});
};
