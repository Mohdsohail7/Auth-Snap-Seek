const express = require('express');
const router = express.Router();
const { getCurrentUser, logoutUser } = require('../controllers/authUserController');

// Get current user
router.get('/me', getCurrentUser);

// Logout
router.post('/logout', logoutUser);

module.exports = router;
