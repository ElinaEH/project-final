import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
// import listEndpoints from "express-list-endpoints";

dotenv.config(); // Load environment variables

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/final-project";

// Connect to MongoDB Atlas
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoAtlas:", err);
  });

mongoose.Promise = Promise;

const port = process.env.PORT || 5000;
; // Removed port 8080 cause it was interfering with an existing port 8080, look this up later?
const app = express();

app.use(cors());
app.use(express.json());

// Use the authRoutes for sign-up and sign-in
app.use("/auth", authRoutes); // Mount authRoutes on the /auth path

// console.log("All Endpoints:");
// console.log(listineEndpoints(app));

// Public endpoint (can be accessed by anyone, remove later on?)
app.get("/", (req, res) => {
  res.send("Hello Technigo!");
});

// Protected route (only accessible after logging in)
app.get("/secrets", authenticateUser, (req, res) => {
  res.json({ secret: "This is a super secret message." });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
