import express from "express";
import multer from "multer";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { uploadAudio, getAudioFiles, getAudio, deleteAudio } from "../controllers/audioController.js";

const router = express.Router();

// Configures storage settings for multer
const storage = multer.diskStorage({
	// Define where to store the uploaded audio files
	destination: "uploads/audio/",

	// Define the filename for each uploaded file
	filename: (req, file, cb) => {
		// Replacing special characters that might cause file system issues
		const sanitizedName = file.originalname.replace(/[/\\?%*:|"<>]/g, "_");
		// Add a unique timestamp to the filename to avoid name collisions
		const uniqueName = `${Date.now()}-${sanitizedName}`;

		// Pass the unique filename to the callback function
		cb(null, uniqueName);
	}
});

// Set up multer with the storage configuration, file validation and file size limits
const upload = multer({
	storage, 
	fileFilter: (req, file, cb) => {
		// Only allows audio files (MIME type)
		if (file.mimetype.startsWith("audio/")) {
			cb(null, true);
		} else {
			cb(new Error("Only audio files are allowed")); // Reject file if not audio
		}
	},
	limits: {
		fileSize: 10 * 1024 * 1024 // Set file size limit 10MB
	}
});

// Route for uploading audio files (authenticated users only)
router.post("/upload", authenticateUser, upload.single("audio"), uploadAudio);

// Route to get a list of all uploaded audio files (authenticated users only)
router.get("/files", authenticateUser, getAudioFiles);

// Route to get specific audio file by its ID
router.get("/:fileId", authenticateUser, getAudio);

// Route to delete an audio file by its ID
router.delete("/:fileId", authenticateUser, deleteAudio);

export default router;