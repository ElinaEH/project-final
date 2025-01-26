import express from "express";
import multer from "multer";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { uploadAudio, getAudioFiles, getAudio, deleteAudio } from "../controllers/audioController.js";

const router = express.Router();

const storage = multer.diskStorage({
	destination: "uploads/audio/",
	filename: (req, file, cb) => {
		// Replace special characters that might cause file system issues
		const sanitizedName = file.originalname.replace(/[/\\?%*:|"<>]/g, '_');
		const uniqueName = `${Date.now()}-${sanitizedName}`;
		cb(null, uniqueName);
	}
});

const upload = multer({
	storage, 
	fileFilter: (req, file, cb) => {
		if (file.mimetype.startsWith("audio/")) {
			cb(null, true);
		} else {
			cb(new Error("Only audio files are allowed"));
		}
	},
	limits: {
		fileSize: 10 * 1024 * 1024 // 10MB limit
	}
});

router.post("/upload", authenticateUser, upload.single("audio"), uploadAudio);
router.get("/files", authenticateUser, getAudioFiles);
router.get("/:fileId", authenticateUser, getAudio);
router.delete("/:fileId", authenticateUser, deleteAudio);

export default router;