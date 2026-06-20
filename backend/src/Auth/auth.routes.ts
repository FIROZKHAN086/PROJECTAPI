import { Router } from "express";
import { authLimiter } from "../middleware/rateLimit.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "./auth.controller.js";

const router = Router();

router.post("/register", authLimiter, registerUser);
router.post("/login", authLimiter, loginUser);
router.post("/logout", authLimiter, logoutUser);

export default router;
