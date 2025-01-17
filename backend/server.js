import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { authenticateUser } from "./middleware/authMiddleware.js"; 
import profileRoutes from "./routes/profileRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// CORS Middleware
app.use(cors({
  origin: "http://localhost:5173", // Frontend URL
  methods: "GET, POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
  credentials: true
}));

app.use(express.json());

// Database connection
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  });

// Routes
// Use the authenticateUser middleware for protected routes (if any)
app.use("/protectedRoute", authenticateUser, (req, res) => {
  res.send("This route is protected!");
});

// Autnetication Route
app.use("/auth", authRoutes); // Assuming this doesn't need authentication

// User Profile Route
app.use("/profile", profileRoutes);

// Default route, remove later?
app.get("/", (req, res) => res.send("Welcome to the Elinas API"));

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
