// Import "express" package - Fast, unopinionated, minimalist web framework
const express = require("express");
// Import "user" controller
const userCtrl = require("../controllers/user");
// Create a router with "express"
const router = express.Router();
// Import "auth" middleware - Authentication middleware
const auth = require("../middleware/auth");

// Route POST - Sign Up
router.post("/signup", userCtrl.signup);
// Route POST - Login
router.post("/login", userCtrl.login);
// Route DELETE - Delete one user
router.delete("/delete_user/:id", auth, userCtrl.deleteUser);

module.exports = router;
