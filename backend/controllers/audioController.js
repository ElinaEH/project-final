// This file handles audio file management endpoints including upload, retrieval, and deletion operations for users

import User from "../models/userModel.js";
import fs from "fs/promises";
import path from "path";

export const uploadAudio = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No audio file uploaded" });
      }
  
      const savedAudioFile = {
        filename: req.file.filename,
        path: req.file.path,
        uploadDate: new Date()
      };
  
      // Save audio file metadata to user's profile
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
      console.error("Upload error:", error);
      res.status(500).json({ message: "Error uploading file" });
    }
};

export const getAudioFiles = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.savedAudioFiles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching audio files" });
  }
};

export const getAudio = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // Find specific audio file by ID
    const audioFile = user.savedAudioFiles.find(file => file._id.toString() === req.params.fileId);
    
    if (!audioFile) {
      return res.status(404).json({ message: "Audio file not found" });
    }
    res.json(audioFile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching audio file" });
  }
};

export const deleteAudio = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const audioFile = user.savedAudioFiles.find(file => file._id.toString() === req.params.fileId);

    if (!audioFile) {
      return res.status(404).json({ message: "Audio file not found" });
    }

    // Delete physical file from server
    try {
      await fs.unlink(path.join(process.cwd(), audioFile.path));
    } catch (fileError) {
      console.warn("Could not delete file from filesystem:", fileError);
    }

    // Update user document by removing file reference
    user.savedAudioFiles = user.savedAudioFiles.filter(
      file => file._id.toString() !== req.params.fileId
    );
    await user.save();

    res.json({ message: "Audio file deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting file" });
  }
};