const express = require('express');
const router = express.Router();
const {
  googleAuth,
  googleCallback,
  githubAuth,
  githubCallback,
  facebookAuth,
  facebookCallback
} = require('../controllers/authProvidersController');

// Google
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

// GitHub
router.get('/github', githubAuth);
router.get('/github/callback', githubCallback);

// Facebook
router.get('/facebook', facebookAuth);
router.get('/facebook/callback', facebookCallback);

module.exports = router;
