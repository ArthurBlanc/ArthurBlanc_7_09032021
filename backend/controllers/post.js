// Import database connection info
const sql = require("../middleware/database");

// Route POST - Create one post
exports.createPost = (req, res, next) => {
	let userId = req.body.userId;
	let postContent = req.body.content;
	let imageURL = req.file ? req.file.filename : null;
	sql.query(`INSERT INTO posts VALUES (NULL, ?, ?, NOW(), ?, 0, 0)`, [userId, postContent, imageURL], (error, results, fields) => {
		if (error) throw error;
		return res.status(201).json({ message: "Votre post a été publié !" });
	});
};
// Route GET - Get all the posts
exports.getAllPosts = (req, res, next) => {
	sql.query(
		"SELECT users.nom, users.prenom, posts.id, posts.userId, posts.content, posts.likes, posts.dislikes, posts.date AS date, posts.image AS postImage, thumbs.liked, thumbs.disliked FROM users INNER JOIN posts ON users.id = posts.userId LEFT JOIN thumbs ON thumbs.postId = posts.id ORDER BY date DESC",
		(error, results, fields) => {
			if (error) throw error;
			return res.status(200).json(results);
		}
	);
};
// Route GET - Get one post
exports.getOnePost = (req, res, next) => {
	let postId = req.params.id;
	sql.query(
		"SELECT users.nom, users.prenom, posts.id, posts.userId, posts.content, posts.likes, posts.dislikes, posts.date AS date, posts.image AS postImage, thumbs.liked, thumbs.disliked FROM users INNER JOIN posts ON users.id = posts.userId LEFT JOIN thumbs ON thumbs.postId = posts.id WHERE posts.id = ?",
		[postId],
		(error, results, fields) => {
			if (error) throw error;
			return res.status(200).json(results);
		}
	);
};
// Route PUT - Modify one post
exports.modifyPost = (req, res, next) => {
	let postContent = req.body.content;
	let postId = req.params.id;
	let imageURL = req.file ? req.file.filename : null;
	if (imageURL === null) {
		sql.query("UPDATE posts SET content = ? WHERE id = ?", [postContent, postId], (error, results, fields) => {
			if (error) throw error;
			return res.status(200).json(results);
		});
	} else {
		sql.query("UPDATE posts SET content = ?, image = ? WHERE id = ?", [postContent, imageURL, postId], (error, results, fields) => {
			if (error) throw error;
			return res.status(200).json(results);
		});
	}
};
// Route DELETE - Delete one post
exports.deletePost = (req, res, next) => {
	let postId = req.params.id;
	sql.query("DELETE FROM posts WHERE id = ?", [postId], (error, results, fields) => {
		if (error) throw error;
		return res.status(200).json(results);
	});
};
