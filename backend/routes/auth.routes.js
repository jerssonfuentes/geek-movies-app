import { Router } from "express";
import { register, login, refreshToken } from "../controllers/auth.controller.js";
import rateLimit from "../middlewares/rateLimit.js";

const router = Router();

// Registro de usuarios
router.post("/register", rateLimit, register);

// Login de usuario
router.post("/login", rateLimit, login);

// Refrescar token
router.post("/refresh", refreshToken);

export default router;
