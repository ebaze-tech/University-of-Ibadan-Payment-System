const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');
const GoogleController = require('../controllers/googleController');

// Register route
router.post('/register', UserController.register);

// Login route
router.post('/login', AuthController.login);

// Logout route
router.post('/logout', AuthController.logout);

// Google OAuth routes
router.get('/google-login', GoogleController.googleLogin);
router.get('/google-callback', GoogleController.googleCallback);


module.exports = router;