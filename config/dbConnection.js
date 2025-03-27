const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = require("../server");

const uri =
  "mongodb+srv://MarcusChrispat:Vande@chrispatcluster.sxkhx.mongodb.net/MarcusChrispat?retryWrites=true&w=majority";


  const connectDb = async () => {
  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Stop the server if DB fails to connect
  }
};

module.exports = connectDb;
