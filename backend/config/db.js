const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;

async function connect() {
  if (!db) {
    await client.connect();
    db = client.db(process.env.DB_NAME || "geekdb");
  }
  return { db, client };
}

module.exports = { connect };
