// Import "express" package - Fast, unopinionated, minimalist web framework
const express = require("express");
// Import "user" controller
const userCtrl = require("../controllers/user");
// Create a router with "express"
const router = express.Router();

// Route POST - Sign Up
router.post("/signup", userCtrl.signup);

module.exports = router;
