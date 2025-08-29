// seed.js
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Ajusta si usas Atlas
const dbName = "geekdb"; // nombre de la BD (puedes cambiarlo)

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB");

    const db = client.db(dbName);

    // 1. Usuarios (un admin y un user normal)
    const users = [
      { _id: new ObjectId(), name: "Admin", email: "admin@geek.com", password: "hashed_admin", role: "admin" },
      { _id: new ObjectId(), name: "User", email: "user@geek.com", password: "hashed_user", role: "user" },
    ];
    await db.collection("users").deleteMany({});
    await db.collection("users").insertMany(users);
    console.log("👤 Usuarios insertados");

    // 2. Categorías
    const categories = [
      { _id: new ObjectId(), name: "Anime" },
      { _id: new ObjectId(), name: "Ciencia Ficción" },
      { _id: new ObjectId(), name: "Superhéroes" },
      { _id: new ObjectId(), name: "Fantasía" },
    ];
    await db.collection("categories").deleteMany({});
    await db.collection("categories").insertMany(categories);
    console.log("📂 Categorías insertadas");

    // 3. Películas (algunas aprobadas y otras pendientes)
    const movies = [
      {
        title: "Naruto Shippuden",
        description: "Historia ninja con batallas épicas",
        categoryId: categories[0]._id,
        year: 2007,
        imageUrl: null,
        approved: true,
        ratingSum: 9,
        ratingCount: 1,
        createdAt: new Date(),
      },
      {
        title: "Avengers: Endgame",
        description: "La batalla final de los Vengadores",
        categoryId: categories[2]._id,
        year: 2019,
        imageUrl: null,
        approved: true,
        ratingSum: 10,
        ratingCount: 1,
        createdAt: new Date(),
      },
      {
        title: "Película pendiente",
        description: "Esperando aprobación de admin",
        categoryId: categories[3]._id,
        year: 2023,
        imageUrl: null,
        approved: false,
        ratingSum: 0,
        ratingCount: 0,
        createdAt: new Date(),
      },
    ];
    await db.collection("movies").deleteMany({});
    const movieResult = await db.collection("movies").insertMany(movies);
    console.log("🎬 Películas insertadas");

    // 4. Reseñas
    const reviews = [
      {
        movieId: movieResult.insertedIds["0"],
        userId: users[1]._id,
        title: "Épico",
        comment: "Naruto siempre será legendario",
        rating: 9,
        likes: [],
        dislikes: [],
        createdAt: new Date(),
      },
      {
        movieId: movieResult.insertedIds["1"],
        userId: users[1]._id,
        title: "Excelente cierre",
        comment: "La mejor de Marvel",
        rating: 10,
        likes: [],
        dislikes: [],
        createdAt: new Date(),
      },
    ];
    await db.collection("reviews").deleteMany({});
    await db.collection("reviews").insertMany(reviews);
    console.log("✍️ Reseñas insertadas");

    console.log("🌱 Seed completado con éxito 🚀");
  } catch (err) {
    console.error("❌ Error en seed:", err.message);
  } finally {
    await client.close();
    console.log("🔌 Conexión cerrada");
  }
}

seed();
