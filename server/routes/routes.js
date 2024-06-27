const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const AuthController = require('../controllers/authController');
// Register route
router.post('/register', UserController.register);

// Login route
router.post('/login', AuthController.login);

// Logout route
router.post('/logout', AuthController.logout);



module.exports = router;