// backend/config/db.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/geek-movies";
const DB_NAME = process.env.DB_NAME || "geek-movies";

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = null;

/**
 * Conecta a Mongo y devuelve la instancia DB
 */
export async function connectDB() {
  if (db) return db;
  try {
    await client.connect();
    db = client.db(DB_NAME);
    console.log("✅ MongoDB conectado:", MONGO_URI, "DB:", DB_NAME);
    await ensureIndexesAndSeed(); // crea admin si no existe
    return db;
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err);
    throw err;
  }
}

export function getDB() {
  if (!db) throw new Error("DB no inicializada. Llama connectDB() primero.");
  return db;
}

export function getCollection(name) {
  return getDB().collection(name);
}

async function ensureIndexesAndSeed() {
  const users = getCollection("users");

  // índice único en username y email (si no existían)
  try {
    await users.createIndex({ username: 1 }, { unique: true });
    await users.createIndex({ email: 1 }, { unique: true, sparse: true });
  } catch (err) {
    // ignore if already created
  }

  // Crear admin por defecto si no existe
  const admin = await users.findOne({ username: "admin" });
  if (!admin) {
    // contraseña por defecto: admin123  (se guarda hasheada en controller/seed)
    console.log("ℹ️ No existe admin — se creará cuando el servidor inicie.");
    // NOTE: la creación real del admin se hace en el servidor al arrancar (seed)
  }
}

export async function closeDB() {
  await client.close();
  db = null;
}
