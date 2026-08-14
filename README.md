# UCP 1 PAW - Toko Sembako Ariesta

Proyek ini adalah implementasi Website dan REST API untuk "Toko Sembako Ariesta" (UMKM), dilengkapi dengan fitur Dashboard Admin (CRUD) dan fitur **Dummy Tanya AI Assistant**. Proyek ini dibuat untuk memenuhi Ujian Capaian Pembelajaran (UCP) 1 mata kuliah Pemrograman Aplikasi Web (PAW).

## Informasi Mahasiswa
* **Nama**: Nurul Najat Mony
* **NIM**: 20240140042
* **Kelas**: B

## Deskripsi Singkat Project
Aplikasi web *full stack* berbasis Node.js dan Express.js untuk mengelola katalog produk toko sembako. Aplikasi ini memisahkan hak akses antara pengunjung umum (publik) dan admin. Dilengkapi dengan sistem *REST API* yang dikonsumsi secara asinkron menggunakan *Fetch API* di sisi klien, serta sebuah *endpoint* khusus yang menyimulasikan bot cerdas (Tanya AI) berbasis pendeteksian kata kunci (*keyword matching*).

## Cara Menjalankan Project Secara Lokal
1. Pastikan Node.js sudah terinstal di komputer.
2. Unduh/clone repository ini.
3. Buka terminal di dalam folder proyek, lalu ketik perintah berikut untuk menginstal semua dependencies:
    npm install
4. Jalankan server lokal:
    npm run dev
5. Buka browser dan akses: http://localhost:3000

## Kredensial Admin
* **Username**: admin
* **Password**: password123

---

## Dokumentasi & Pengujian API (Postman)
Berikut adalah bukti pengujian *Endpoint* REST API menggunakan Postman. Endpoint dengan tanda 🔒 memerlukan Autentikasi (Sesi Login).

### 1. Endpoint Autentikasi
**1.1. Login Admin**
* **Method & URL**: POST /api/login
* **Deskripsi**: Melakukan login admin dan mengaktifkan sesi (*session cookie*).
* **Bukti Screenshot**:
<br><img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/0a5455cc-7d4e-4a3c-9c3f-ae06b5f2d8b2" />

### 2. Produk (CRUD)
**2.1. Ambil Semua Produk**
* **Method & URL**: GET /api/products
* **Deskripsi**: Mengambil daftar semua produk sembako (Akses Publik).
* **Bukti Screenshot**:
<br><img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/745c63ee-925d-464b-9e20-df3752e0fe92" />

**2.2. Tambah Produk 🔒**
* **Method & URL**: POST /api/products
* **Deskripsi**: Menambah produk baru ke dalam sistem (Membutuhkan Login).
* **Bukti Screenshot**:
<br><img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/b7e11d6c-c4f5-4eb4-b18e-cf141247db5e" />

**2.3. Uji Keamanan / Unauthorized 🔒**
* **Method & URL**: DELETE /api/products/:id
* **Deskripsi**: Menguji keamanan sistem. Menolak akses (Error 401) jika seseorang mencoba menghapus produk tanpa login terlebih dahulu.
* **Bukti Screenshot**:
<br><img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/1d7d2364-c641-4726-acf0-eda29823a350" />

### 3. Dummy Tanya AI
**3.1. Chat AI Assistant**
* **Method & URL**: POST /api/chat
* **Deskripsi**: Mengirim pesan dari client ke backend dan menerima balasan otomatis berdasarkan deteksi kata kunci. 
* **Bukti Screenshot**:
<br><img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/549e5fc1-e7c2-4e82-85e7-9e27ab560824" />

---

## Penjelasan Mengenai Tampilan (UI)
Seluruh tampilan UI dibangun dengan gaya **Premium Dark Theme** (*glassmorphism*) yang responsif. Terdapat elemen-elemen semantik HTML5 dengan *layout* Flexbox/Grid.

1. **Halaman Beranda (/)**: Menampilkan *Hero Banner* bertema *cinematic dark* yang elegan serta *card* fitur utama toko (Stok, AI, Pesan Antar).
2. **Halaman Produk (/produk)**: Menyajikan katalog barang secara dinamis melalui REST API (menggunakan *Fetch*). Menampilkan harga yang diformat dengan pemisah ribuan.
3. **Halaman Detail Produk (/produk/:id)**: Rincian produk spesifik, dilengkapi dengan tombol aksi pintar **Beli via WhatsApp** yang langsung menghubungkan pengguna ke nomor WhatsApp admin, serta tombol khusus menuju AI.
4. **Halaman Tanya AI (/tanya-ai)**: Antarmuka *chat bubble* layaknya aplikasi obrolan pintar. Berjalan sepenuhnya asinkron; pesan yang dikirim tidak memuat ulang halaman (*no-reload*).
5. **Halaman Login (/login)**: Form aman berlapis proteksi validasi untuk admin sebelum memasuki *Dashboard*.
6. **Halaman Dasbor Admin (/dashboard)**: Pusat kontrol berdesain *clean & dark* untuk mengelola (*Create, Read, Update, Delete*) data produk secara instan, dilengkapi form *modal* dengan validasi terintegrasi.
