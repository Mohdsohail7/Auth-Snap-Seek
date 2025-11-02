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
exports.logoutUser = (req, res) => {
  req.logout(() => {}); 
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
};
