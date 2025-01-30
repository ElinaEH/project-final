import mongoose from "mongoose";

// Define the word schema for word exercise
const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  }
});

const Word = mongoose.model("Word", wordSchema);

export default Word;