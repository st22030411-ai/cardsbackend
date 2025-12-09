import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://5btics:350t1l1n@cluster1.tya41dc.mongodb.net/cards";

export const connectDB = async () => {
  try {
    console.log("Conectando a Mongo con URI:", MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Successfully!!!!");
  } catch (error) {
    console.error("Mongo DB Connection Failed", error);
  }
};


