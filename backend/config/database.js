const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const mongoDBURL = process.env.DATABASE;
    await mongoose.connect(mongoDBURL);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit the application on database connection failure
  }
};

module.exports = connectToDatabase;
