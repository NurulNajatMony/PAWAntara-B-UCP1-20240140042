const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ status: "error", message: "Pesan tidak boleh kosong" });
  }

  const userMessage = message.toLowerCase();
  let reply = "Maaf, saya tidak mengerti pertanyaan tersebut. Coba tanyakan tentang jam buka, ongkir, stok, atau pembayaran.";

  if (userMessage.includes("jam buka") || userMessage.includes("buka jam berapa")) {
    reply = "Toko kami buka setiap hari jam 07.00 - 20.00!";
  } else if (userMessage.includes("ongkir") || userMessage.includes("antar")) {
    reply = "Kami menyediakan layanan pesan antar. Ongkir gratis untuk jarak di bawah 3km!";
  } else if (userMessage.includes("stok") || userMessage.includes("tersedia")) {
    reply = "Stok selalu kami update di halaman Produk. Silakan cek halaman Produk ya.";
  } else if (userMessage.includes("bayar") || userMessage.includes("pembayaran")) {
    reply = "Kami menerima pembayaran tunai (Cash) dan transfer Bank / QRIS.";
  }

  res.json({
    status: "success",
    data: { reply }
  });
});

module.exports = router;
