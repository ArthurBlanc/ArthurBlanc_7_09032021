// Import "express" package - Fast, unopinionated, minimalist web framework
const express = require("express");
// Import "auth" middleware - Authentication middleware
const auth = require("../middleware/auth");
// Import "thumb" controller
const thumbCtrl = require("../controllers/thumb");
// Create a router with "express"
const router = express.Router();

// Route PUT - Create thumb
router.put("/:id", auth, thumbCtrl.createThumb);

module.exports = router;
