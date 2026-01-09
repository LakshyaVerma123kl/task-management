import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} from "../controllers/task.controller";
import {
  taskValidation,
  taskUpdateValidation,
} from "../middleware/validation.middleware";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// All task routes require authentication
router.use(authenticateToken);

router.get("/", getTasks);
router.post("/", taskValidation, createTask);
router.get("/:id", getTaskById);
router.patch("/:id", taskUpdateValidation, updateTask);
router.delete("/:id", deleteTask);
router.post("/:id/toggle", toggleTaskStatus);

export default router;
