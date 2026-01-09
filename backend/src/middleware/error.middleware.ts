import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  _req: Request, // Prefix with underscore
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(500).json({
    error: "Internal server error",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};

export const notFoundHandler = (
  _req: Request, // Prefix with underscore
  res: Response,
  _next: NextFunction // Prefix with underscore
): void => {
  res.status(404).json({ error: "Route not found" });
};
