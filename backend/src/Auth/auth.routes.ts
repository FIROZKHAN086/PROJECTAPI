import { Router } from "express";
import { rateLimitMiddleware } from "../middleware/rateLimit.middleware.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  VerifyOtp,
  NewOtpsend,
} from "./auth.controller.js";
import { authMiddleware } from "../middleware/Auth.middlewere.js";
import { otpVerificationMiddleware } from "../middleware/otpverification.middlewere.js";

const router = Router();

router.post("/register", rateLimitMiddleware, registerUser);
router.post("/login", rateLimitMiddleware, loginUser);
router.post("/logout", rateLimitMiddleware, logoutUser);
router.get("/get-me", authMiddleware, getCurrentUser);
router.post("/verify-otp", rateLimitMiddleware, otpVerificationMiddleware, VerifyOtp);
router.post("/resend-otp", rateLimitMiddleware, otpVerificationMiddleware, NewOtpsend);

export default router;
