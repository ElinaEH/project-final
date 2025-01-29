import express from "express";
import Word from "../models/wordModel.js";

const router = express.Router();

// Get random word
router.get("/random", async (req, res) => {
  try {
    const count = await Word.countDocuments();
    const random = Math.floor(Math.random() * count);
    const word = await Word.findOne().skip(random);
    res.json(word);
  } catch (error) {
    res.status(500).json({ message: "Error fetching random word", error: error.message });
  }
});

// Get all words (for testing)
router.get("/all", async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (error) {
    res.status(500).json({ message: "Error fetching words", error: error.message });
  }
});

export default router;
