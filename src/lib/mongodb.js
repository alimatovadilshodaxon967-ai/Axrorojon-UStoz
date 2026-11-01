// ========================================================
// Yulduzlar Fullstack - MongoDB Connection Manager
// Mongoose Connection Caching for Next.js App Router
// ========================================================

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/yulduzlar_db";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000 // Tezkor timeout
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      console.log("✓ MongoDB muvaffaqiyatli ulandi:", MONGODB_URI);
      return m;
    }).catch((err) => {
      console.warn("! MongoDB ulanishida ogohlantirish (Offline/Mock rejim):", err.message);
      cached.promise = null;
      return null;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    return null;
  }

  return cached.conn;
}

export default connectToDatabase;
