// Import "express" package - Fast, unopinionated, minimalist web framework
const express = require("express");
// Import "auth" middleware - Authentication middleware
const auth = require("../middleware/auth");
// Import "comment" controller
const commentCtrl = require("../controllers/comment");
// Create a router with "express"
const router = express.Router();

// Route POST - Create one comment
router.post("/:postId/", auth, commentCtrl.createComment);
// Route GET - Get all comments of a post
router.get("/:postId/", auth, commentCtrl.getAllComments);

module.exports = router;
