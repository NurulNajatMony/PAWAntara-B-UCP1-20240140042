const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();
const PORT = 3000;

// Middleware Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware
app.use(session({
  secret: 'ariesta-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 hari
}));

// Global variable for view templates (to check login status)
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Custom logger middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Routes Import
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const chatRoutes = require("./routes/chatRoutes");
const pageRoutes = require("./routes/pageRoutes");

// Register Routes
app.use("/api", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/chat", chatRoutes);
app.use("/", pageRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});