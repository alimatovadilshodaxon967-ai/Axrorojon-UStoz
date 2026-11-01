import mongoose from "mongoose";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/yulduzlar_db";
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    console.log(`✓ MongoDB muvaffaqiyatli ulandi: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`! MongoDB ulanish xatosi (Offline/Mock rejim): ${error.message}`);
    return null;
  }
};
