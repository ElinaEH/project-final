import mongoose from "mongoose";
import crypto from "crypto";

// Define the schema for User model
const userSchema = new mongoose.Schema({
    name: {
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
      default: () => crypto.randomBytes(2).toString( "hex" )
    }
  });

  const User = mongoose.model( "User", userSchema);
  export default User;

  // Remove after testing
  console.log(crypto.randomBytes(2).toString("Hex"));
