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

module.exports = router;
