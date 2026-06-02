import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "modern_portfolio";

let cachedClient = null;
let cachedDb = null;

export const getDb = async () => {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  if (cachedClient && cachedDb) {
    return cachedDb;
  }

  cachedClient = new MongoClient(uri);
  await cachedClient.connect();
  cachedDb = cachedClient.db(dbName);
  return cachedDb;
};
