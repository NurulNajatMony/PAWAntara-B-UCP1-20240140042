const express = require('express');
const router = express.Router();
const products = require('../data/products');
const authMiddleware = require('../middleware/auth');

// GET /api/products - Ambil seluruh data produk
router.get('/', (req, res) => {
  let result = products;

  // Filter query parameters (search dan kategori)
  const { search, kategori } = req.query;
  if (search) {
    result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }
  if (kategori) {
    result = result.filter(p => p.category.toLowerCase() === kategori.toLowerCase());
  }

  res.json({
    status: "success",
    data: result
  });
});

// GET /api/products/:id - Ambil satu produk berdasarkan ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
  }

  res.json({
    status: "success",
    data: product
  });
});

// POST /api/products - Tambah produk baru (Butuh Login)
router.post('/', authMiddleware, (req, res) => {
  const { name, category, price, stock } = req.body;
  
  if (!name || !category || price === undefined || stock === undefined) {
    return res.status(400).json({ status: "error", message: "Data tidak lengkap" });
  }

  const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  const newProduct = {
    id: newId,
    name,
    category,
    price: parseInt(price),
    stock: parseInt(stock)
  };

  products.push(newProduct);

  res.status(201).json({
    status: "success",
    message: "Produk ditambahkan",
    data: newProduct
  });
});

// PUT /api/products/:id - Update produk (Butuh Login)
router.put('/:id', authMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
  }

  const { name, category, price, stock } = req.body;

  // Update field jika disediakan
  if (name) products[index].name = name;
  if (category) products[index].category = category;
  if (price !== undefined) products[index].price = parseInt(price);
  if (stock !== undefined) products[index].stock = parseInt(stock);

  res.json({
    status: "success",
    message: "Produk diperbarui",
    data: products[index]
  });
});

// DELETE /api/products/:id - Hapus produk (Butuh Login)
router.delete('/:id', authMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ status: "error", message: "Produk tidak ditemukan" });
  }

  products.splice(index, 1);

  res.json({
    status: "success",
    message: "Produk dihapus"
  });
});

module.exports = router;
