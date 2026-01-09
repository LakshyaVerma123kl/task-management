import { Router } from "express";
import {
  register,
  login,
  refresh,
  logout,
} from "../controllers/auth.controller";
import {
  registerValidation,
  loginValidation,
} from "../middleware/validation.middleware";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
router.post("/refresh", refresh);
router.post("/logout", authenticateToken, logout);

export default router;
