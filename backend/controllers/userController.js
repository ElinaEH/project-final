import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Create a new user
export const createUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, password: hashedPassword });
    await user.save();

    res.status(201).json({ id: user._id, accessToken: user.accessToken });
  } catch (error) {
    res.status(400).json({ message: "Could not create user", error: error.message });
  }
};

// Sign in an existing user
export const signInUser = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (user && await bcrypt.compare(password, user.password)) {
      user.accessToken = crypto.randomBytes(32).toString("hex");
      await user.save();

      res.json({
        id: user._id,
        accessToken: user.accessToken,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error signing in", error: error.message });
  }
};

// Get user details
export const getUserDetails = async (req, res) => {
  try {
    const user = req.user; // Retrieved from authenticateUser middleware
    res.json({ id: user._id, name: user.name });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user details", error: error.message });
  }
};
