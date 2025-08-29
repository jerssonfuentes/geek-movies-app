// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { connectDB } = require("./config/db");

const authRoutes = require("./routes/auth.routes");

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 60 * 1000, max: 100 }));

// Rutas
app.use("/api/auth", authRoutes);

connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
});
