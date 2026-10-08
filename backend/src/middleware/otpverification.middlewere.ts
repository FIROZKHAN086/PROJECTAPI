import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface OtpVerificationPayload {
  id: string;
  OneTimeID: string;
}

export const otpVerificationMiddleware = (
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
      process.env.JWT_SECRET as string
    ) as OtpVerificationPayload;

    if (!decoded || !decoded.id || !decoded.OneTimeID) {
      return res.status(401).json({
        success: false,
        message: "Invalid OTP verification session.",
        code: "INVALID_OTP_SESSION",
      });
    }

    (req as any).otpUser = {
      id: decoded.id,
      OneTimeID: decoded.OneTimeID,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        success: false,
        message: "OTP verification session has expired.",
        code: "OTP_VERIFICATION_EXPIRED",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid OTP verification session.",
      code: "INVALID_OTP_VERIFICATION_TOKEN",
    });
  }
};
