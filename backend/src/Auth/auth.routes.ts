import { Router } from "express";
import { rateLimitMiddleware } from "../middleware/rateLimit.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "./auth.controller.js";

const router = Router();

router.post("/register", rateLimitMiddleware, registerUser);
router.post("/login", rateLimitMiddleware, loginUser);
router.post("/logout", rateLimitMiddleware, logoutUser);
router.get("/me", getCurrentUser);

export default router;
