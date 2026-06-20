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

const router = Router();

router.post("/creat", authMiddleware, createProject);

router.get("/get", authMiddleware, getProjects);

router.get("/getproject/:id", authMiddleware, getProjectById);

router.patch("/update/:id", authMiddleware, updateProject);

router.delete("/delete/:id", authMiddleware, deleteProject);

router.post("/public", getPublicProjects);

export default router;
