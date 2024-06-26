const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
// const AuthController = require('../controllers/authController');
// const GoogleController = require('../controllers/googleController');

// POST /api/users/register Register route
router.post('/register', UserController.register);

// GET /api/users/:id
router.get('/:id', UserController.getUserById);

module.exports = router;