// File to configure Cloudinary integration

import  { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Configure Cloudinary with credentials form .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRETS
});

// Configure storage setting for Cloudinary
const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "audio_files", // Store files in this folder in Cloudinary
		resource_type: "auto" // Automatically detect resource typ (audio)
	}
});

// Export configured multer middleware that uses Cloudinary storage
export const upload = multer ({ storage });
