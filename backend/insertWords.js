import Word from "./models/wordModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Configure dotenv to read .env file
dotenv.config();


// Words array
const words = [
  // Emotions
  { word: "love", category: "emotions" },
  { word: "hope", category: "emotions" },
  { word: "fear", category: "emotions" },
  { word: "joy", category: "emotions" },
  { word: "pain", category: "emotions" },
  { word: "peace", category: "emotions" },
  
  // Nature
  { word: "ocean", category: "nature" },
  { word: "sky", category: "nature" },
  { word: "sun", category: "nature" },
  { word: "moon", category: "nature" },
  { word: "stars", category: "nature" },
  { word: "rain", category: "nature" },
  
  // Actions
  { word: "dance", category: "actions" },
  { word: "sing", category: "actions" },
  { word: "run", category: "actions" },
  { word: "fly", category: "actions" },
  { word: "dream", category: "actions" },
  { word: "cry", category: "actions" },
  
  // Time
  { word: "forever", category: "time" },
  { word: "moment", category: "time" },
  { word: "night", category: "time" },
  { word: "dawn", category: "time" },
  { word: "dusk", category: "time" }
];

// Function to insert words
const insertWords = async () => {
    try {
      // Clear existing words
      await Word.deleteMany({});
      console.log("Cleared existing words");
  
      // Insert new words
      const result = await Word.insertMany(words);
      console.log(`Successfully inserted ${result.length} words`);
      
      // Exit after completion
      process.exit(0);
    } catch (error) {
      console.error("Error inserting words:", error);
      process.exit(1);
    }
  };
  
  // Wait for MongoDB connection before running
  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected, inserting words...');
    insertWords();
  });
  
  // Connect to MongoDB using MONGO_URL from .env
  console.log('Attempting to connect to MongoDB...'); // Debug log
  mongoose.connect(process.env.MONGO_URL)
    .catch(error => {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    });