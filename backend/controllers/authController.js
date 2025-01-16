import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/userModel.js";

// Generate a random token
const generateToken = () => crypto.randomBytes(32).toString("hex");

// Validate token format (length and characters)
const validateToken = (token) => {
  return typeof token === "string" && token.length === 64;
};

// Sign-up controller
export const signup = async (req, res) => {
  const { username, password } = req.body;

  console.log("Received signup request with username:", username);

  try {
    // Validate password length
    if (password.length < 8 || password.length > 128) {
      return res.status(400).json({ message: "Password must be between 8 and 128 characters." });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken." });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const accessToken = generateToken();  // Using generateToken function here
    const user = new User({ username, password: hashedPassword, accessToken });

    await user.save();
    res.status(201).json({ message: "User created successfully", accessToken });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

// Sign-in controller
export const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    user.accessToken = generateToken();  // Using generateToken function here
    await user.save();
    res.json({ message: "Login successful", accessToken: user.accessToken });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error: error.message });
  }
};
