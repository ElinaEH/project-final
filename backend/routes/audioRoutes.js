import express from "express";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { uploadAudio, getAudioFiles, getAudio, deleteAudio } from "../controllers/audioController.js";
import { upload } from "../config/cloudinary.js";

const router = express.Router();

// Routes
router.post("/upload", authenticateUser, upload.single("audio"), uploadAudio);
router.get("/files", authenticateUser, getAudioFiles);
router.get("/:fileId", authenticateUser, getAudio);
router.delete("/:fileId", authenticateUser, deleteAudio);

export default router;