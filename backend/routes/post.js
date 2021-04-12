// Import "express" package - Fast, unopinionated, minimalist web framework
const express = require("express");
// Import "auth" middleware - Authentication middleware
const auth = require("../middleware/auth");
// Import "post" controller
const postCtrl = require("../controllers/post");
// Create a router with "express"
const router = express.Router();

// Route POST - Create one post
router.post("/", auth, postCtrl.createPost);
// Route GET - Get all the posts
router.get("/", auth, postCtrl.getAllPosts);
// Route GET - Get one post
router.get("/:id", auth, postCtrl.getOnePost);
// Route PUT - Modify one post
router.put("/:id", auth, postCtrl.modifyPost);
// Route DELETE - Delete one post
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
