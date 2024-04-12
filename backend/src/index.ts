// External imports
import express, { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import { rateLimit } from "express-rate-limit";

// Internal imports
import dataroute from "./routes/data/index.js";
import auth from "./routes/AuthRoute/index.js";
import usersroute from "./routes/users/index.js";
import verifications from "./routes/verificationsRoute/index.js";
import walletroute from "./routes/wallet/index.js";

import connectDB from "./database/connection.js";
import cors from "cors";

config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 10 requests per window
  message: "Too many requests from this IP, please try again after 15 minutes",
});

app.use(apiLimiter);

app.use("/get", dataroute);
app.use("/auth", auth);
app.use("/verify", verifications);
app.use("/users", usersroute);
app.use("/wallet", walletroute);


app.all("*", (req: Request, res: Response) => {
  return res.status(404).json({
    type: "error",
    message: "Route not found",
  });
});

// Global error handling middleware
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).json({
    type: "error",
    message:
      "an erro occured, please contact the adminstrator for help with this issue.",
  });
});

const port = process.env.BACKEND_PORT;
app.listen(port, async () => {
  try {
    await connectDB();
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
});
