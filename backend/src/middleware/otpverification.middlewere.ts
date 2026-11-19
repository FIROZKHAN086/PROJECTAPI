import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import redis from "../config/redis.js";
import { getCookieOptions } from "../utils/getCookieOptions.js";

interface OtpVerificationPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export const otpVerificationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   
    const token = req.cookies?.otp_verification;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "OTP verification session expired. Please register again.",
        code: "OTP_VERIFICATION_REQUIRED",
      });
    }

    
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as OtpVerificationPayload;

    
    if (!decoded?.id || typeof decoded.id !== "string") {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP verification session.",
        code: "INVALID_OTP_SESSION",
      });
    }

    
    const pendingKey = `pending:${decoded.id}`;

    const pendingUser = await redis.get(pendingKey);

    if (!pendingUser) {
      res.clearCookie("otp_verification", getCookieOptions());

      return res.status(401).json({
        success: false,
        message: "Registration session expired. Please register again.",
        code: "REGISTRATION_SESSION_EXPIRED",
      });
    }

    
    (req as any).otpUser = {
      OneTimeID: decoded.id,
    };

    
    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.clearCookie("otp_verification", getCookieOptions());

      return res.status(401).json({
        success: false,
        message: "OTP verification session has expired.",
        code: "OTP_VERIFICATION_EXPIRED",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP verification token.",
        code: "INVALID_OTP_VERIFICATION_TOKEN",
      });
    }

    console.error("OTP middleware error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to verify OTP session.",
    });
  }
};
