// Get current user
exports.getCurrentUser = (req, res) => {
  if (!req.user) return res.json({ user: null });

  res.json({
    user: {
      id: req.user._id,
      displayName: req.user.displayName,
      email: req.user.email,
      avatar: req.user.avatar,
    },
  });
};

// Logout user
exports.logoutUser = (req, res, next) => {
  if (!req.session) return res.status(400).json({ error: "No session found" });

  req.logout(function(err) {
    if (err) return next(err);

    req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
  }); 
};
