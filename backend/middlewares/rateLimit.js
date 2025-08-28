const rateLimit = require("express-rate-limit");

// Límite de peticiones: 100 por cada 15 minutos por IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: {
    success: false,
    message: "Demasiadas solicitudes desde esta IP, inténtalo más tarde",
  },
});

module.exports = apiLimiter;
