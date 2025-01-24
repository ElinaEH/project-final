/**
 * This middleware validates the user's token and protects routes from unauthorized access.
 * Used on routes that require user authentication.
 */
import User from "../models/userModel.js";

export const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "No token provided or invalid format" });
    }

    // Extract the token from "Bearer <token>"
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Find user by token
    const user = await User.findOne({ accessToken: token });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};
