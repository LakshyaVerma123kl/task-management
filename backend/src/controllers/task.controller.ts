import { Response } from "express";
import { validationResult } from "express-validator";
import prisma from "../config/database";
import { AuthRequest, PaginationQuery } from "../types";
import { TaskStatus } from "@prisma/client";

export const getTasks = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const {
      page = "1",
      limit = "10",
      status,
      search,
    } = req.query as PaginationQuery;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const where: any = {
      userId: req.user.userId,
    };

    if (status && ["PENDING", "IN_PROGRESS", "COMPLETED"].includes(status)) {
      where.status = status as TaskStatus;
    }

    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    const [tasks, total] = await Promise.all([
      prisma.task.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.task.count({ where }),
    ]);

    res.json({
      tasks,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

export const getTaskById = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const { id } = req.params;

    const task = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user.userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    res.json({ task });
  } catch (error) {
    console.error("Get task error:", error);
    res.status(500).json({ error: "Failed to fetch task" });
  }
};

export const createTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const { title, description, status } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        status: status || "PENDING",
        userId: req.user.userId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
};

export const updateTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const { id } = req.params;
    const { title, description, status } = req.body;

    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!existingTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (status !== undefined) updateData.status = status;

    const task = await prisma.task.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ error: "Failed to update task" });
  }
};

export const deleteTask = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const { id } = req.params;

    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!existingTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ error: "Failed to delete task" });
  }
};

export const toggleTaskStatus = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: "Not authenticated" });
      return;
    }

    const { id } = req.params;

    const existingTask = await prisma.task.findFirst({
      where: {
        id,
        userId: req.user.userId,
      },
    });

    if (!existingTask) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    const newStatus =
      existingTask.status === "COMPLETED" ? "PENDING" : "COMPLETED";

    const task = await prisma.task.update({
      where: { id },
      data: { status: newStatus },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.json({
      message: "Task status toggled successfully",
      task,
    });
  } catch (error) {
    console.error("Toggle task error:", error);
    res.status(500).json({ error: "Failed to toggle task status" });
  }
};
