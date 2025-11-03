import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://5btics:3s0t1l1n@cluster1.tya41dc.mongodb.net/cards"
  ;

export const connectDB = async () => {
  try {
    console.log(MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected Succesfully!!!!");
  } catch (error) {
    console.error("Mongo DB Connection Failed", error);
  }
};


