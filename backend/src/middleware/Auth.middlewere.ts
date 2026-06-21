// src/middlewares/auth.middleware.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    name: string;
    email: string;
    OneTimeID: string;
    Role: string;
  };
}

interface JwtPayload {
  id: string;
  name: string;
  email: string;
  OneTimeID: string;
  Role: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const token =  req.cookies?.token;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "user not login.",
      });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    
    req.user = decoded

 // prodution to use this logs as your wish 
    // console.log(`[${new Date().toISOString()}] [INFO] Fetching  user to decoded : ` , decoded);
    
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
