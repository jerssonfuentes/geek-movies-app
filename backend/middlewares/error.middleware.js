// Middleware centralizado para manejo de errores
const errorMiddleware = (err, req, res, next) => {
  console.error("❌ Error capturado:", err);

  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";

  res.status(status).json({
    success: false,
    status,
    message,
  });
};

module.exports = errorMiddleware;
