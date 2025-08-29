// backend/server.js

// 1. Importaciones de Módulos
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const { connectDB } = require('./config/db'); // Importa nuestra función de conexión a la DB

// 2. Conexión a la Base de Datos
// Ejecutamos la función para conectar con MongoDB Atlas al iniciar el servidor.
connectDB();

// 3. Inicialización de la Aplicación Express
const app = express();

// 4. Middlewares
// Habilita CORS para permitir que tu frontend se comunique con este backend.
app.use(cors());
// Permite que Express pueda entender y procesar datos en formato JSON en el cuerpo de las peticiones.
app.use(express.json());

// 5. Definición de Rutas
// Cualquier petición que empiece con '/api/auth' será manejada por nuestro router de autenticación.
app.use('/api/auth', require('./routes/auth.routes'));
// --- Aquí agregarías tus otras rutas en el futuro ---
// app.use('/api/movies', require('./routes/movie.routes'));
// app.use('/api/reviews', require('./routes/review.routes'));

// Ruta de bienvenida para probar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('API de GeekMovies funcionando correctamente.');
});

// 6. Arranque del Servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});