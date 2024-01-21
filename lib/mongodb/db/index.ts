import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;
let cashed = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cashed.conn) return cashed.conn;
  if (!MONGODB_URL) throw new Error("MONGODB_URL is not defined");
  cashed.promise =
    cashed.promise ||
    mongoose.connect(MONGODB_URL, {
      dbName: "mohevent",
      bufferCommands: false,
    });
  cashed.conn = await (cashed.promise as Promise<typeof mongoose>);
  return cashed.conn;
};
