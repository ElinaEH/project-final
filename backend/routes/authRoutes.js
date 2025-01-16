import express from "express";
import { signup, signin } from "../controllers/authController.js";

const router = express.Router();

// Authentication routes
router.post("/signup", signup); // Handles user signup
router.post("/signin", signin); // Handles user signin

export default router;
