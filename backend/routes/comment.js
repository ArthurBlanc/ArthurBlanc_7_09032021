// Import "express" package - Fast, unopinionated, minimalist web framework
const express = require("express");
// Import "auth" middleware - Authentication middleware
const auth = require("../middleware/auth");
// Import "comment" controller
const commentCtrl = require("../controllers/comment");
// Import "joiValidator " middleware
const joiValidator = require("../middleware/joi-validator");
// Import Post model
const Comment = require("../models/Comment");
// Create a router with "express"
const router = express.Router();

// Route POST - Create one comment
router.post("/:postId/", auth, joiValidator(Comment.comment, "body"), commentCtrl.createComment);
// Route GET - Get all comments of a post
router.get("/:postId/", auth, commentCtrl.getAllComments);
// Route DELETE - Delete one comment
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
