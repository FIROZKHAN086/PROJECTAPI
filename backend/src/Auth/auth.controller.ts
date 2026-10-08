import { Request, Response } from "express";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import { generateToken } from "../utils/jwt.js";
import { v4 as uuidv4 } from "uuid";
import { generateOtp } from "../utils/OtpGeneration.js";
import redis from "../config/redis.js";
import { getCookieOptions } from "../utils/getCookieOptions.js";
import { sendEmail } from "../utils/sendEmail.js";
import { otpEmailTemplate}  from "../config/otpEmail.js";
import { welcomeEmailTemplate } from "../config/welcomeEmail.js";

// Register Route

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique OneTime ID
    const OneTimeID = uuidv4();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        OneTimeID: OneTimeID,
        Role: "USER",
      },
    });

    const OneTimeOtp = await generateOtp();

    const OnetimeOtpKey = `otp:${user.OneTimeID}`;
    await redis.set(OnetimeOtpKey, OneTimeOtp, "EX", 5 * 60);

    // todo : // Send OTP through Email/SMS provider

    const otpEmailHtml = otpEmailTemplate(OneTimeOtp, user.email, 5);

    const SendOtpEmail = await sendEmail(
      user.email,
      "Your OTP Code",
      OneTimeOtp,
      otpEmailHtml
    );

    if (!SendOtpEmail) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email",
      });
    }

    // Generate JWT token otp_verification
    const otp_verification = generateToken({
      id: user.id.toString(),
      name: user.name || "",
      email: user.email,
      Role: user.Role,
      OneTimeID: user.OneTimeID || "",
    });

    // Set token in cookies
    res.cookie("otp_verification", otp_verification, {
      ...getCookieOptions(),
      maxAge: 30 * 60 * 1000, // 30 minutes
    });

    return res.status(201).json({
      success: true,
      code: "OTP_REQUIRED",
      message: "OTP sent successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        userVerified: user.userVerified,
      },
    });
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] [ERROR] Registration failed:`,
      error
    );
    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};

//Login Route

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user?.userVerified) {
      return res.status(403).json({
        success: false,
        message: "User not verified. Please verify your email.",
      });
    }

    const token = generateToken({
      id: user.id.toString(),
      name: user.name || "",
      email: user.email,
      Role: user.Role,
      OneTimeID: user.OneTimeID || "",
    });

    res.cookie("token", token, {
      ...getCookieOptions(),
      maxAge: 30 * 60 * 1000, // 30 minutes
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.Role,
        OneTimeID: user.OneTimeID,
        createdAt: user.createdAt,
        userVerified: user.userVerified,
      },
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] [ERROR] Login failed:`, error);
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: process.env.NODE_ENV === "development" ? error : undefined,
    });
  }
};

// Logout Route

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      ...getCookieOptions(),
      maxAge: 0,
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] [ERROR] Logout failed:`,
      error
    );
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

// * Get Current User Route

export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const token =
      (req as any).cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
        code: "NOT_AUTHENTICATED",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };

    const user = await prisma.user.findUnique({
      where: {
        id: Number(decoded.id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        Role: true,
        OneTimeID: true,
        createdAt: true,
        userVerified: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        code: "USER_NOT_FOUND",
      });
    }

    if (!user.userVerified) {
      return res.status(403).json({
        success: false,
        message: "User not verified. Please verify your email.",
        code: "USER_NOT_VERIFIED",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.Role,
        OneTimeID: user.OneTimeID,
        createdAt: user.createdAt,
        userVerified: user.userVerified,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      code: "INVALID_TOKEN",
    });
  }
};

// * Verify OTP Route
export const VerifyOtp = async (req: Request, res: Response) => {
  try {
    const OneTimeID = (req as any).otpUser?.OneTimeID;
    const otp = req.body.otp?.trim();

    if (!OneTimeID || !otp) {
      return res.status(400).json({
        success: false,
        message: "OTP is required",
      });
    }

    const otpKey = `otp:${OneTimeID}`;

    const storedOtp = await redis.get(otpKey);

    if (!storedOtp) {
      return res.status(400).json({
        success: false,
        code: "OTP_EXPIRED",
        message: "OTP has expired or is invalid",
      });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({
        success: false,
        code: "INVALID_OTP",
        message: "Invalid OTP",
      });
    }

    const result = await prisma.user.updateMany({
      where: {
        OneTimeID,
        userVerified: false,
      },
      data: {
        userVerified: true,
      },
    });

    if (result.count === 0) {
      return res.status(400).json({
        success: false,
        code: "ALREADY_VERIFIED",
        message: "User not found or already verified",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        OneTimeID,
      },
      select: {
        id: true,
        name: true,
        email: true,
        Role: true,
        OneTimeID: true,
        createdAt: true,
        userVerified: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await redis.del(otpKey);

    const token = generateToken({
      id: user.id.toString(),
      name: user.name || "",
      email: user.email,
      Role: user.Role,
      OneTimeID: user.OneTimeID || "",
    });

    res.cookie("token", token, {
      ...getCookieOptions(),
      maxAge: 30 * 60 * 1000, // 30 minutes
    });

    res.clearCookie("otp_verification", {
      ...getCookieOptions(),
      maxAge: 0,
    });

    // ? after successful verification, send a welcome email
    const welcomeEmailHtml = welcomeEmailTemplate(user.name ?? undefined);

    await sendEmail(
      user.email,
      "Welcome to ProjectAPI!",
      `Hello ${user.name}, welcome to ProjectAPI!`,
      welcomeEmailHtml
    );

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.Role,
        OneTimeID: user.OneTimeID,
        createdAt: user.createdAt,
        userVerified: user.userVerified,
      },
    });
  } catch (error) {
    console.error("OTP verification failed:", error);

    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};

// * Resend OTP Route
export const NewOtpsend = async (req: Request, res: Response) => {
  try {
    const OneTimeID = (req as any).otpUser?.OneTimeID;

    if (!OneTimeID) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: { OneTimeID },
      select: {
        userVerified: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.userVerified) {
      return res.status(409).json({
        success: false,
        message: "User is already verified",
        code: "ALREADY_VERIFIED",
      });
    }

    const otp = await generateOtp();

    const otpKey = `otp:${OneTimeID}`;

    await redis.set(otpKey, otp, "EX", 5 * 60);

    // TODO: Send OTP through Email/SMS provider

    const otpEmailHtml = otpEmailTemplate(otp, user.email, 5);

    const SendOtpEmail = await sendEmail(
      user.email,
      "Your OTP Code",
      otp,
      otpEmailHtml
    );

    return res.status(200).json({
      success: true,
      message: "New OTP sent successfully",
    });
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] [ERROR] OTP generation failed:`,
      error
    );

    return res.status(500).json({
      success: false,
      message: "OTP generation failed",
    });
  }
};
