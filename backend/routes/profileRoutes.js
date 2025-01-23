import express from "express";
import User from "../models/userModel.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { saveExercise } from "../controllers/profileController.js";

const router = express.Router();

// Get user profile
router.get("/", authenticateUser, async (req, res) => {
  try {
    console.log("Received profile request");
    console.log("User from auth middleware:", req.user); // Debug the user object
    console.log("User ID:", req.user._id); // Debug the user ID

    const user = await User.findById(req.user._id).select("-password");
    console.log("Found user:", user); // Debug the found user

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Profile fetch error:", error)
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update user profile
router.put("/", authenticateUser, async (req, res) => {
  try {
    console.log("Received update request");
    console.log("Update data:", req.body);
    
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    console.log("Updated user:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.post("/save-exercise", authenticateUser, saveExercise);

export default router;