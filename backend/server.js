require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("./middlewares/rateLimit");
const errorHandler = require("./middlewares/error.middleware");
const passport = require("passport");

require("./config/passport"); // carga estrategia JWT

const authRoutes = require("./routes/auth.routes");

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(rateLimit);
app.use(passport.initialize());

// Rutas
app.use("/api/auth", authRoutes);

// Middleware de errores centralizado
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Servidor en http://localhost:${PORT}`));
