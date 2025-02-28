import User from "../models/userModel.js";
import { v2 as cloudinary } from 'cloudinary';

// Upload audio file to Cloudinary and save metadata to user profile
export const uploadAudio = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No audio file uploaded" });
    }

    const savedAudioFile = {
      filename: req.file.originalname,
      path: req.file.path, // Cloudinary URL of uploaded file
      uploadDate: new Date()
    };

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { savedAudioFiles: savedAudioFile } },
      { new: true }
    );

    res.json({
      message: "Audio file uploaded successfully",
      audioFile: savedAudioFile
    });
  } catch (error) {
    res.status(500).json({ message: "Error uploading file" });
  }
};

// Get all audio files for the authenticated user
export const getAudioFiles = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.savedAudioFiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching audio files" });
  }
};

// Get a specific audio file by ID
export const getAudio = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const audioFile = user.savedAudioFiles.find(file => file._id.toString() === req.params.fileId);

    if (!audioFile) {
      return res.status(404).json({ message: "Audio file not found" });
    }
    res.json(audioFile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching audio file" });
  }
};

// Delete audio file from Cloudinary and remove from user's saved files
export const deleteAudio = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const audioFile = user.savedAudioFiles.find(file => file._id.toString() === req.params.fileId);

    if (!audioFile) {
      return res.status(404).json({ message: "Audio file not found" });
    }

    // Extract file ID and delete from Cloudinary
    const publicId = audioFile.path.split('/').slice(-1)[0].split('.')[0];
    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });

    // Remove file reference from user document
    user.savedAudioFiles = user.savedAudioFiles.filter(
      file => file._id.toString() !== req.params.fileId
    );
    await user.save();

    res.json({ message: "Audio file deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting file" });
  }
};
