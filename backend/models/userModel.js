// Database schemas

import mongoose from "mongoose";
import crypto from "crypto";

// Define the schema for User model
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    accessToken:{
      type: String,
      default: () => crypto.randomBytes(32).toString( "hex" )
    },

    // Profile fields for User Profile
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    profileImage: {
      type: String, // URL for profile image?
    },
  });

  // Add timestamps for createdAt and updatedAt
  userSchema.set("timestamps", true)

  // Create and export the User model
  const User = mongoose.model( "User", userSchema);
 
  export default User;
