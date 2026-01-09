import { Request, Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../config/database";
import { hashPassword, comparePassword } from "../utils/password.utils";
import { generateTokens, verifyRefreshToken } from "../utils/jwt.utils";
import { AuthRequest } from "../types";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password, name } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ error: "Email already registered" });
      return;
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: name || null,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    const tokens = generateTokens({ userId: user.id, email: user.email });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    res.status(201).json({
      message: "User registered successfully",
      user,
      tokens,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const tokens = generateTokens({ userId: user.id, email: user.email });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      tokens,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Failed to login" });
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ error: "Refresh token required" });
      return;
    }

    const decoded = verifyRefreshToken(refreshToken);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || user.refreshToken !== refreshToken) {
      res.status(403).json({ error: "Invalid refresh token" });
      return;
    }

    const tokens = generateTokens({ userId: user.id, email: user.email });

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: tokens.refreshToken },
    });

    res.json({
      message: "Token refreshed successfully",
      tokens,
    });
  } catch (error) {
    if (error instanceof Error && error.name === "TokenExpiredError") {
      res.status(403).json({ error: "Refresh token expired" });
      return;
    }
    console.error("Refresh token error:", error);
    res.status(403).json({ error: "Invalid refresh token" });
  }
};

export const logout = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    await prisma.user.update({
      where: { id: req.user.userId },
      data: { refreshToken: null },
    });

    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Failed to logout" });
  }
};
