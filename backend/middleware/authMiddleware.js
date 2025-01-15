import User from "../models/userModel.js";

export const authenticateUser = async (req, res, next) => {
	const accessToken = req.header("Authorization");

	// Check if token exists
	if (!accessToken) {
		return res.status(401).json({ message: "Access token is required" });
	}

	try {
		// Validate
		if (accessToken.length !== 64) {
			return res.status(401).json({ message: "Invalid token format" });
		}

		// Find user with token
		const user = await User.findOne({ accessToken });
		if (!user) {
			return res.status(401).json({ message: "Invalid token" });
		}

		// Attach user information to the request object
		req.user = user;
		next();
	} catch (error) {
		res.status(500).json({ message: "Authentication error", error: error.message });
	}
};
