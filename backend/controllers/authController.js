import User from "../models/userModel.js";
import crypto from "crypto";
import bcrypt from "bcrypt";

// Sign-up controller
export const signup = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Validate password length
    // Minimum 8 characters
    if (password.length < 8 || password.length > 128) {
      return res.status(400).json({
        message: "Password must be between 8 and 128 characters long"
      });
    }

    // Check if username already exists 
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({
        message: "Username already taken" 
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate an access token
    const accessToken = crypto.randomBytes(32).toString("hex");
    
    // Create a new user
    const user = new User({
      name,
      password: hashedPassword,
      accessToken
    });

    await user.save();

    res.status(201).json({
      message: "User created successfully",
      accessToken
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: error.message 
    });
  }
};

// Sign-in controller
export const signin = async (req, res) => {
  try {
    const { name, password } = req.body;

    // Find user by name
    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({
         message: "Invalid credentials" 
        });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: "Invalid credentials" 
      });
    }

    // Generate new access token
    user.accessToken = crypto.randomBytes(32).toString("hex");
    await user.save();

    res.json({
      message: "Login successful",
      accessToken: user.accessToken
    });
  } catch (error) {
    res.status(500).json({
      message: "Error during login", 
      error: error.message 
    });
  }
};
