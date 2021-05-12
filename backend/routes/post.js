// Import "express" package - Fast, unopinionated, minimalist web framework
const express = require("express");
// Import "auth" middleware - Authentication middleware
const auth = require("../middleware/auth");
// Import "multer" middleware - Use for images files management
const multer = require("../middleware/multer-config");
// Import "joiValidator " middleware
const joiValidator = require("../middleware/joi-validator");
// Import Post model
const Post = require("../models/Post");
// Import "post" controller
const postCtrl = require("../controllers/post");
// Create a router with "express"
const router = express.Router();

// Route POST - Create one post
router.post("/", auth, multer, joiValidator(Post.post, "body"), postCtrl.createPost);
// Route GET - Get all the posts
router.get("/", auth, postCtrl.getAllPosts);
// Route GET - Get all the posts from a category
router.get("/category/:categoryId", auth, postCtrl.getAllCategoryPosts);
// Route GET - Get one post
router.get("/:id", auth, postCtrl.getOnePost);
// Route PUT - Modify one post
router.put("/:id", auth, multer, joiValidator(Post.post, "body"), postCtrl.modifyPost);
// Route DELETE - Delete one post
router.delete("/:id", auth, postCtrl.deletePost);

module.exports = router;
