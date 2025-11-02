const passport = require('passport');

// this for google auth
exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleCallback = [
  passport.authenticate('google', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: true }),
  (req, res) => res.redirect(process.env.CLIENT_URL || 'http://localhost:3000')
];

// this for github auth
exports.githubAuth = passport.authenticate('github', { scope: ['user:email'] });

exports.githubCallback = [
  passport.authenticate('github', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: true }),
  (req, res) => res.redirect(process.env.CLIENT_URL || 'http://localhost:3000')
];

// this for facebook auth
exports.facebookAuth = passport.authenticate('facebook', { scope: ['email'] });

exports.facebookCallback = [
  passport.authenticate('facebook', { failureRedirect: `${process.env.CLIENT_URL}/login`, session: true }),
  (req, res) => res.redirect(process.env.CLIENT_URL || 'http://localhost:3000')
];
