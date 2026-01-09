import { body, ValidationChain } from "express-validator";

export const registerValidation: ValidationChain[] = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("name")
    .optional()
    .trim()
    .isLength({ min: 1 })
    .withMessage("Name must not be empty"),
];

export const loginValidation: ValidationChain[] = [
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required"),
];

export const taskValidation: ValidationChain[] = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 200 })
    .withMessage("Title must not exceed 200 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),
  body("status")
    .optional()
    .isIn(["PENDING", "IN_PROGRESS", "COMPLETED"])
    .withMessage("Invalid status value"),
];

export const taskUpdateValidation: ValidationChain[] = [
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Title must not be empty")
    .isLength({ max: 200 })
    .withMessage("Title must not exceed 200 characters"),
  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage("Description must not exceed 1000 characters"),
  body("status")
    .optional()
    .isIn(["PENDING", "IN_PROGRESS", "COMPLETED"])
    .withMessage("Invalid status value"),
];
