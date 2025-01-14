import express from "express";
import { signup, signin } from "../controllers/authController.js";

export const router = express.Router();

// Route for user signup
router.post("/signup", signup);

// Route for user signin
router.post("/signin", signin);
