import express from "express";
import { getChordProgression, getMoodProgression } from "../controllers/chordController.js";

const router = express.Router();
router.get("/progression", getChordProgression);
router.get("/mood-progression", getMoodProgression);

export default router;
