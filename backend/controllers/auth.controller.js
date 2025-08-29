const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connect } = require("../config/db");
const { validationResult } = require("express-validator");

async function register(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, name } = req.body;
    const { db } = await connect();

    const exists = await db.collection("users").findOne({ email });
    if (exists) return res.status(409).json({ msg: "El correo ya está registrado" });

    const hashed = await bcrypt.hash(password, 10);
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashed,
      role: "user",
      createdAt: new Date(),
    });

    res.status(201).json({ id: result.insertedId });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const { db } = await connect();

    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(401).json({ msg: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ msg: "Contraseña incorrecta" });

    const token = jwt.sign(
      { sub: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, role: user.role });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login };
