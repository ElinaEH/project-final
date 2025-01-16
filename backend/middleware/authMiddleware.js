import User from "../models/userModel.js";

export const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization");

  try {
    const user = await User.findOne({ accessToken: token });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    req.user = user; // Attach user to the request object
    next();
  } catch (error) {
    res.status(500).json({ message: "Error authenticating user", error: error.message });
  }
};
