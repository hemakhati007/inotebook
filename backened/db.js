const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/iNotebook";

// Function to get promises and connect to MongoDB
const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

module.exports = connectToMongo;