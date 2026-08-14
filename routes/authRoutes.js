const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

// Hardcoded admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'password123';

// POST /api/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ status: "error", message: "Username dan password wajib diisi" });
  }

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Set session
    req.session.user = { username };
    return res.json({ status: "success", message: "Login berhasil" });
  } else {
    return res.status(401).json({ status: "error", message: "Username atau password salah" });
  }
});

// POST /api/logout
router.post('/logout', authMiddleware, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Gagal logout" });
    }
    res.clearCookie('connect.sid');
    return res.json({ status: "success", message: "Logout berhasil" });
  });
});

module.exports = router;
