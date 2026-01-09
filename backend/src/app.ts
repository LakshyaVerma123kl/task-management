import express from "express";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./routes/auth.routes";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRouter);

// Health check endpoint
app.get("/health", (_req, res) => {
  // Prefix with underscore
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

// Error handling (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
