import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { verifyAccessToken } from "../utils/jwt.utils";

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ error: "Access token required" });
      return;
    }

    const decoded = verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error && error.name === "TokenExpiredError") {
      res.status(401).json({ error: "Access token expired" });
      return;
    }
    res.status(403).json({ error: "Invalid access token" });
  }
};
