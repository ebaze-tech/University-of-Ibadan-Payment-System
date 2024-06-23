const express = require('express');
const router = express.Router();
const GoogleController = require('../controllers/googleController');

router.get('/login', GoogleController.googleLogin);
router.get('/callback', GoogleController.googleCallback);

module.exports = router;