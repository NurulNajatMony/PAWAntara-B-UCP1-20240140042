const authMiddleware = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    // Jika via API (Fetch) return 401 JSON
    if (req.originalUrl.startsWith('/api/') || req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
      return res.status(401).json({ status: "error", message: "Unauthorized, silakan login terlebih dahulu" });
    }
    // Jika akses via browser ke halaman, redirect ke login
    res.redirect('/login');
  }
};

module.exports = authMiddleware;
