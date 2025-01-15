import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { authenticateUser } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new user
router.post("/user", async (req, res) => {
  try {
		const { name, password } = req.body;

		// Hash password
		const hashedPassword = bcrypt.hashSync(password, 10);

		// Create and save the user
		const user = new User({ name, password: hashedPassword });
		await user.save();

		res.status(201).json({ id: user._id, accesToken: user.accessToken });
	} catch (error) {
		res.status(400).json({
			message: "Could not create user",
			errors: error.message,
		});
	}
});

// Secret endpoint
router.get("/secrets", authenticateUser, (req, res) => {
	res.json({ secret: "This is a super secret message." });
});

// Create a session (sign in)
router.post("/sessions", async (req, res) => {
	try {
		const { name, password } = req.body;

		// Find user by name
		const user = await User.findOne({ name });

		if (user && bcrypt.compareSync(password, user.password)) {
			// Regenerate the access token
			user.accessToken = crypto.randomBytes(32).toString("hex");
			await user.save();

			res.json({
				id: user._id,
				accessToken: user.accessToken,
			});
		} else {
			res.status(401).json({ notFound: true });
		}
	} catch (error) {
		res.status(500).json({ message: "Error signing in", error: error.message });
	}
});
