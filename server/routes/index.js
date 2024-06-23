const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const googleRoutes = require('./googleRoutes');

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/auth/google', googleRoutes);

module.exports = router;