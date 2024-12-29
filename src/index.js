import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Get the current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.sample
dotenv.config({ path: path.join(__dirname, "../.env.sample") });

console.log("MONGODB_URI: ", process.env.MONGODB_URI);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed: ", err);
  });
