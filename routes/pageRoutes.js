const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const products = require('../data/products');

// Halaman Beranda
router.get('/', (req, res) => {
  res.render('index');
});

// Halaman Produk (Publik)
router.get('/produk', (req, res) => {
  res.render('products');
});

// Halaman Detail Produk
router.get('/produk/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  if (!product) {
    return res.render('not-found', { message: "Produk tidak ditemukan" });
  }
  res.render('product-detail', { product });
});

// Halaman Tanya AI
router.get('/tanya-ai', (req, res) => {
  res.render('tanya-ai');
});

// Halaman Login
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/dashboard');
  }
  res.render('login');
});

// Halaman Dashboard (Protected)
router.get('/dashboard', authMiddleware, (req, res) => {
  res.render('dashboard');
});

module.exports = router;
