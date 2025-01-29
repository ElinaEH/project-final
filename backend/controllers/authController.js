import bcrypt from "bcrypt";
import crypto from "crypto";
import User from "../models/userModel.js";

// Generate a random token
const generateToken = () => crypto.randomBytes(32).toString("hex");

// Validate token format (length and characters) // Look this up why it"s not being used?
const validateToken = (token) => {
  return typeof token === "string" && token.length === 64;
};

// Sign-up controller
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Received signup request with username:", username);

  try {
    // Basic validation for required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields (username, email, password) are required." });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Validate password length
    if (password.length < 8 || password.length > 128) {
      return res.status(400).json({ message: "Password must be between 8 and 128 characters." });
    }

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken." });
    }

    // Check if the email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const accessToken = generateToken();  // Using generateToken function here
    const user = new User({ username, email, password: hashedPassword, accessToken });

    await user.save();
    res.status(201).json({ message: "User created successfully", accessToken });
  } catch (error) {
    console.error("Error during signup:", error);

    // Handle duplicate key errors from MongoDB
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username or email already taken." });
    }
    
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

// Sign-in controller
export const signin = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    // If no user found or password doesn"t match
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate new access token
    const newToken = generateToken();

    // Update user"s access token
    user.accessToken = newToken; 
    await user.save({ validateBeforeSave: false });

    // Include user ID and username in the response
    res.json({ 
      message: "Login successful", 
      accessToken: newToken,
      user: {
        username: user.username,
        email: user.email,
        id: user._id
      }
    });
  } catch (error) {
    console.log("Signin error", error);
    res.status(500).json({ message: "Error during login", error: error.message });
  }
};
