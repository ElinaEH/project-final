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
    email: {
      type: String,
      unique: true,
      required: true,
      sparse: true, // Look this up what it means?
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true
    },
    accessToken:{
      type: String,
      default: () => crypto.randomBytes(32).toString( "hex" )
    },
    savedExercises: [{
      type: {
        type: String,
        enum: ["word", "chord"]
      },
      content: Object,
      savedAt: {
        type: Date,
        default: Date.now
      }
    }],
    savedAudioFiles: [{
      filename: String,
      path: String,
      uploadDate: Date,
      description: String
    }]
  });

  // Add timestamps for createdAt and updatedAt
  userSchema.set("timestamps", true)

  // Create and export the User model
  const User = mongoose.model( "User", userSchema);
 
  export default User;
