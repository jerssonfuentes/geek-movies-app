// backend/controllers/auth.controller.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { getDb } = require("../config/db");

const JWT_SECRET = process.env.JWT_SECRET || "secret";

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const db = getDb();
    const users = db.collection("users");

    const exists = await users.findOne({ email });
    if (exists) return res.status(400).json({ message: "El email ya está registrado" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashed, role: role || "user" });

    await users.insertOne(user);
    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDb();
    const users = db.collection("users");

    const user = await users.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Credenciales incorrectas" });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login exitoso", token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
