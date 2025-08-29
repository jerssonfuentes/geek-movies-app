// backend/routes/auth.routes.js
const express = require("express");
const { register, login } = require("../controllers/auth.controller");
const { body } = require("express-validator");

const router = express.Router();

router.post(
  "/register",
  [
    body("username").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  register
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  login
);

module.exports = router;
