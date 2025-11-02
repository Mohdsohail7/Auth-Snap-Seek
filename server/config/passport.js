const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

module.exports = function(passport) {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Google
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const providerId = profile.id;
      let user = await User.findOne({ provider: 'google', providerId });
      if (!user) {
        user = await User.create({
          provider: 'google',
          providerId,
          displayName: profile.displayName,
          email: profile.emails && profile.emails[0] && profile.emails[0].value,
          avatar: profile.photos && profile.photos[0] && profile.photos[0].value
        });
      }
      done(null, user);
    } catch (err) { done(err); }
  }));

  // GitHub
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback',
    scope: ['user:email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let email = null;
      if (profile.emails && profile.emails[0]) email = profile.emails[0].value;
      let user = await User.findOne({ provider: 'github', providerId: profile.id });
      if (!user) {
        user = await User.create({
          provider: 'github',
          providerId: profile.id,
          displayName: profile.displayName || profile.username,
          email,
          avatar: profile.photos && profile.photos[0] && profile.photos[0].value
        });
      }
      done(null, user);
    } catch (err) { done(err); }
  }));

  // Facebook
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ provider: 'facebook', providerId: profile.id });
      if (!user) {
        user = await User.create({
          provider: 'facebook',
          providerId: profile.id,
          displayName: profile.displayName,
          email: profile.emails && profile.emails[0] && profile.emails[0].value,
          avatar: profile.photos && profile.photos[0] && profile.photos[0].value
        });
      }
      done(null, user);
    } catch (err) { done(err); }
  }));
};
