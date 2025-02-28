import express from "express";
import User from "../models/userModel.js";
import { authenticateUser } from "../middleware/authMiddleware.js";
import { saveExercise } from "../controllers/profileController.js";

const router = express.Router();

// Get user profile
router.get("/", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Update user profile
router.put("/", authenticateUser, async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Save exercise
router.post("/save-exercise", authenticateUser, saveExercise);

// Delete exercise - Add this new route
router.delete("/delete-exercise/:exerciseId", authenticateUser, async (req, res) => {
  try {
    const { exerciseId } = req.params;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the exercise index
    const exerciseIndex = user.savedExercises.findIndex(
      exercise => exercise._id.toString() === exerciseId
    );

    if (exerciseIndex === -1) {
      return res.status(404).json({ message: "Exercise not found" });
    }

    // Remove the exercise
    user.savedExercises.splice(exerciseIndex, 1);
    await user.save();

    res.json({
      message: "Exercise deleted successfully",
      updatedExercises: user.savedExercises
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting exercise", error: error.message });
  }
});

export default router;
