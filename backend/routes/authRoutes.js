import express from "express";
import { signup, signin } from "../controllers/authController.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for user signup
router.post("/signup", signup); // Handles POST request to /auth/signup

// Route for user signin
router.post("/signin", signin); // Handles POST request to /auth/signin

// Example of a protected route
router.get("/protected", authenticateUser, (req, res) => {
    res.json({ message: `Welcome ${req.user.name}` });
});

export default router
