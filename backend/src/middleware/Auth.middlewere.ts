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
    const authHeader = req.headers.authorization;
    const headerToken =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : undefined;
    const cookieToken = req.cookies?.token;

    let decoded: JwtPayload | null = null;

    if (headerToken) {
      try {
        decoded = jwt.verify(headerToken, process.env.JWT_SECRET as string) as JwtPayload;
      } catch {
        decoded = null;
      }
    }

    if (!decoded && cookieToken) {
      try {
        decoded = jwt.verify(cookieToken, process.env.JWT_SECRET as string) as JwtPayload;
      } catch {
        decoded = null;
      }
    }

    if (!decoded) {
      res.status(401).json({
        success: false,
        message: headerToken || cookieToken ? "Invalid or expired token." : "user not login.",
      });
      return;
    }

    req.user = decoded;

 
    
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
