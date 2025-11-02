const express = require('express');
const router = express.Router();

const { ensureAuth } = require('../middlewares/authMiddleware');
const { searchPhotos, getHistory, getTopSearches } = require('../controllers/searchController');

// Search Unsplash (requires login)
router.post('/search', ensureAuth, searchPhotos);

// Get user search history (requires login)
router.get('/history', ensureAuth, getHistory);

// Get top 5 searches (public)
router.get('/top-searches', getTopSearches);

module.exports = router;
