import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import listEndpoints from "express-list-endpoints";
import authRoutes from "./routes/authRoutes.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import profileRoutes from "./routes/profileRoutes.js";
import wordRoutes from "./routes/wordRoutes.js";
import chordRoutes from "./routes/chordRoutes.js";
import audioRoutes from "./routes/audioRoutes.js";

// Load environment variables from .env file
dotenv.config();

// Initialize Express app and port
const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://soundseed.netlify.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // Check if the origin is in our allowedOrigins array
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB database
const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";
mongoose
  .connect(mongoUrl)
  .then(() => console.log("Successfully connected to MongoDB!"))
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit if database connection fails
  });

// Route Definitions
// Test protected route (requires authentication)
app.use("/protectedRoute", authenticateUser, (req, res) => {
  res.send("This route is protected!");
});

// Authentication routes (signup, signin)
app.use("/auth", authRoutes);

// User profile routes (protected by authentication)
app.use("/profile", profileRoutes);

// Exercise routes for words and chords
app.use("/words", wordRoutes);    // Random word generator endpoints
app.use("/chords", chordRoutes);  // Chord progression endpoints

// Audio route
app.use("/audio", audioRoutes);

// Landing page and welcome message
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
          body {
            font-family: system-ui, -apple-system, sans-serif;
            padding: 40px;
            margin: 0;
          }
          h1 {
            font-size: 1.2rem;
          }
        </style>
      </head>
      <body>
        <h1> Soundseed Server & API</h1>
      </body>
    </html>
  `)
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    message: "Internal server error occurred",
    error: err.message
  });
});

// Endpoint to view all available API routes
app.get("/endpoints", (req, res) => {
  res.json(listEndpoints(app));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
