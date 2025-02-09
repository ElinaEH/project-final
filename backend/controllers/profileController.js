import User from "../models/userModel.js";

export const saveExercise = async (req, res) => {
  try {
    const userId = req.user._id;
    const { type, content } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          savedExercises: { // Fixed field name
            type,
            content,
            savedAt: new Date() // Fixed field name
          }
        }
      },
      { new: true }
    );

    res.json({ success: true, savedExercises: user.savedExercises });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
