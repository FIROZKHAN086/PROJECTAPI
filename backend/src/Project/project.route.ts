import { Router } from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getPublicProjects,
} from "./Project.controller.js";
import { authMiddleware } from "../middleware/Auth.middlewere.js";
import { rateLimitMiddleware } from "../middleware/rateLimit.middleware.js";

const router = Router();

router.post("/creat", rateLimitMiddleware, authMiddleware, createProject);

router.get("/get",rateLimitMiddleware, authMiddleware, getProjects);

router.get("/getproject/:id",rateLimitMiddleware, authMiddleware, getProjectById);

router.patch("/update/:id",rateLimitMiddleware, authMiddleware, updateProject);

router.delete("/delete/:id",rateLimitMiddleware, authMiddleware, deleteProject);

router.post("/public",rateLimitMiddleware, getPublicProjects);

export default router;
