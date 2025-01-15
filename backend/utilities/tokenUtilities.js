import crypto from "crypto";

// Generate a random token
export const generateToken = () => crypto.randomBytes(32).toString("hex");

// Validate token format (length and characters)
export const validateToken = (token) => {
  return typeof token === "string" && token.length === 64;
};
