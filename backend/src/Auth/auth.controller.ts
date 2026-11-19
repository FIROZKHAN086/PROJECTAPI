import { Request, Response } from "express";

import bcrypt from "bcrypt";
import prisma from "../config/prisma.js";
import { generateToken, GenerateVerifyToken } from "../utils/jwt.js";
import { v4 as uuidv4 } from "uuid";
import { generateOtp } from "../utils/OtpGeneration.js";
import redis from "../config/redis.js";
import { getCookieOptions } from "../utils/getCookieOptions.js";
import { sendEmail } from "../utils/sendEmail.js";
import { otpEmailTemplate } from "../config/otpEmail.js";
import { welcomeEmailTemplate } from "../config/welcomeEmail.js";

// Register Route

let pendingKey: string | undefined;
let otpKey: string | undefined;

const OTP_TTL = 5 * 60; // 5 minutes
const OTP_COOKIE_TTL = 5 * 60 * 1000;
const USER_CACHE_TTL = 15 * 60; // 15 minutes

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body ?? {};

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required",
      });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedName.length < 2 || normalizedName.length > 20) {
      return res.status(400).json({
        success: false,
        message: "Name must be between 2 and 20 characters",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (normalizedEmail.length > 254 || !emailRegex.test(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters and at most 72 bytes",
      });
    }

    //  Check existing user in database
    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
      select: {
        id: true,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
        code: "USER_ALREADY_EXISTS",
      });
    }

    //  Generate unique registration ID
    const OneTimeID = uuidv4();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    //  Generate OTP
    const otp = await generateOtp();

    //  Prepare Redis keys
    pendingKey = `pending:${OneTimeID}`;
    otpKey = `otp:${OneTimeID}`;

    //  Store pending user cache data in Redis
    const pendingUser = {
      kind: "registration" as const,
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    };

    // Store both keys with expiry
    await Promise.all([
      redis.set(pendingKey, JSON.stringify(pendingUser), "EX", OTP_TTL),

      redis.set(otpKey, otp, "EX", OTP_TTL),
    ]);

    const otpVerificationToken = GenerateVerifyToken({
      id: OneTimeID,
    });

    const otpEmailHtml = otpEmailTemplate(otp, normalizedEmail, 5);

    const emailSent = await sendEmail(
      normalizedEmail,
      "Your OTP Verification Code",
      otp,
      otpEmailHtml
    );

    if (!emailSent) {
      await Promise.all([redis.del(pendingKey), redis.del(otpKey)]);

      return res.status(503).json({
        success: false,
        message: "Unable to send verification email. Please try again.",
        code: "EMAIL_DELIVERY_FAILED",
      });
    }

    // Set OTP verification cookie
    res.cookie("otp_verification", otpVerificationToken, {
      ...getCookieOptions(),
      maxAge: OTP_COOKIE_TTL,
    });

    return res.status(200).json({
      success: true,
      code: "OTP_REQUIRED",
      message: "Verification OTP sent successfully",
      user: {
        id: OneTimeID,
        name: normalizedName,
        email: normalizedEmail,
        userVerified: false,
      },
    });
  } catch (error) {
    if (pendingKey || otpKey) {
      try {
        await redis.del(
          ...[pendingKey, otpKey].filter((key): key is string => Boolean(key))
        );
      } catch (cleanupError) {
        console.error("Registration Redis cleanup failed:", cleanupError);
      }
    }

    console.error(`[${new Date().toISOString()}] Registration failed:`, error);

    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again.",
      ...(process.env.NODE_ENV === "development" && {
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    });
  }
};

//Login Route

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body ?? {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
        code: "INVALID_INPUT",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
        code: "INVALID_EMAIL",
      });
    }

    //  Fetch user from db

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        Role: true,
        OneTimeID: true,
        createdAt: true,
        userVerified: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "INVALID_CREDENTIALS.",
        code: "INVALID_CREDENTIALS",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "INVALID_CREDENTIALS.",
        code: "INVALID_CREDENTIALS",
      });
    }

    if (!user.userVerified) {
      const verificationId = uuidv4();
      const loginPendingKey = `pending:${verificationId}`;
      const loginOtpKey = `otp:${verificationId}`;
      const otp = await generateOtp();
      const pendingUser = {
        kind: "login" as const,
        userId: user.id,
        name: user.name,
        email: user.email,
        OneTimeID: user.OneTimeID,
      };

      await Promise.all([
        redis.set(loginPendingKey, JSON.stringify(pendingUser), "EX", OTP_TTL),
        redis.set(loginOtpKey, otp, "EX", OTP_TTL),
      ]);

      const otpVerificationToken = GenerateVerifyToken({ id: verificationId });
      const emailSent = await sendEmail(
        user.email,
        "Your OTP Verification Code",
        otp,
        otpEmailTemplate(otp, user.email, 5)
      );

      if (!emailSent) {
        await redis.del(loginPendingKey, loginOtpKey);
        return res.status(503).json({
          success: false,
          message: "Unable to send verification email. Please try again.",
          code: "EMAIL_DELIVERY_FAILED",
        });
      }

      res.cookie("otp_verification", otpVerificationToken, {
        ...getCookieOptions(),
        maxAge: OTP_COOKIE_TTL,
      });

      return res.status(403).json({
        success: false,
        message: "Verification code sent. Please verify your email.",
        code: "USER_NOT_VERIFIED",
        email: user.email,
      });
    }

    const token = generateToken({
      id: String(user.id),
      name: user.name || "",
      email: user.email,
      OneTimeID: user.OneTimeID || "",
      userVerified: user.userVerified,
    });

    res.cookie("token", token, {
      ...getCookieOptions(),
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    try {
      await redis.del(`user:profile:${user.OneTimeID}`);
    } catch (cacheError) {
      console.error("Login cache invalidation failed:", cacheError);
    }

    const cacheKey = `user:profile:${user.OneTimeID}`;
    await redis.set(cacheKey, JSON.stringify(user), "EX", 7 * 24 * 60 * 60);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
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
    console.error(`[${new Date().toISOString()}] Login failed:`, error);

    return res.status(500).json({
      success: false,
      message: "Unable to login. Please try again.",
      code: "LOGIN_FAILED",
      ...(process.env.NODE_ENV === "development" && {
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    });
  }
};

// Logout Route

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const User = (req as any).user;
    await redis.del(`user:profile:${User?.OneTimeID}`);

    res.clearCookie("token", getCookieOptions());

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
      req.cookies?.token || req.headers.authorization?.startsWith("Bearer ")
        ? req.cookies?.token || req.headers.authorization?.slice(7)
        : null;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated. Please login.",
        code: "NOT_AUTHENTICATED",
      });
    }
    const User = (req as any).user;

    const cacheKey = `user:profile:${User?.OneTimeID}`;

    const cachedUser = await redis.get(cacheKey);
    console.log("Cached user data:", cachedUser);

    if (cachedUser) {
      try {
        const user = JSON.parse(cachedUser);

        if (user?.OneTimeID === User?.OneTimeID) {
           console.log("Returning user data from cache:", user);
          return res.status(200).json({
            success: true,
            message: "User fetched successfully.",
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.Role,
              OneTimeID: user.OneTimeID,
              createdAt: user.createdAt,
              userVerified: user.userVerified,
            },
            source: "cache",
          });
        }

        // Invalid cache: delete and fetch fresh data
        await redis.del(cacheKey);
      } catch (cacheError) {
        console.error("User cache parsing failed:", cacheError);
        await redis.del(cacheKey);
      }
    }

    const user = await prisma.user.findUnique({
      where: {
        id: Number(User?.id),
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

    if (!user || !user.userVerified) {
      return res.status(403).json({
        success: false,
        message: "User not verified",
        code: "USER_NOT_VERIFIED",
      });
    }

    try {
      await redis.set(cacheKey, JSON.stringify(user), "EX", USER_CACHE_TTL);
    } catch (cacheError) {
      // Cache failure should not break authentication
      console.error("User cache update failed:", cacheError);
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.Role,
        OneTimeID: user.OneTimeID,
        createdAt: user.createdAt,
        userVerified: user.userVerified,
      },
      source: "database",
    });
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Get current user failed:`,
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to fetch current user.",
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};

// * Verify OTP Route
export const VerifyOtp = async (req: Request, res: Response) => {
  const otpUser = (req as any).otpUser;

  const OneTimeID = otpUser?.OneTimeID;

  try {
    if (!OneTimeID || typeof OneTimeID !== "string") {
      return res.status(401).json({
        success: false,
        message: "Invalid registration session.",
        code: "INVALID_OTP_SESSION",
      });
    }

    const otp = typeof req.body?.otp === "string" ? req.body.otp.trim() : "";

    if (!/^\d{6}$/.test(otp)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid 6-digit OTP.",
        code: "INVALID_OTP_FORMAT",
      });
    }

    const otpKey = `otp:${OneTimeID}`;
    const pendingKey = `pending:${OneTimeID}`;

    const storedOtp = await redis.get(otpKey);

    if (!storedOtp || storedOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
        code: "INVALID_OR_EXPIRED_OTP",
      });
    }

    const currentOtp = await redis.get(otpKey);

    if (!currentOtp || currentOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP.",
        code: "INVALID_OR_EXPIRED_OTP",
      });
    }

    const pendingData = await redis.get(pendingKey);

    if (!pendingData) {
      return res.status(400).json({
        success: false,
        message: "Registration session expired. Please register again.",
        code: "REGISTRATION_EXPIRED",
      });
    }

    const pendingUser = JSON.parse(pendingData) as {
      kind?: "registration" | "login";
      userId?: number;
      name?: string | null;
      email: string;
      password?: string;
      OneTimeID?: string | null;
    };

    // Registration sessions create a new user; login sessions verify the existing user.
    let user;
    if (pendingUser.kind === "login") {
      if (typeof pendingUser.userId !== "number") {
        return res.status(400).json({
          success: false,
          message: "Invalid login verification session.",
          code: "INVALID_OTP_SESSION",
        });
      }

      const userId = pendingUser.userId;
      user = await prisma.user.update({
        where: { id: userId },
        data: { userVerified: true },
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
    } else {
      if (!pendingUser.password) {
        return res.status(400).json({
          success: false,
          message: "Invalid registration session.",
          code: "INVALID_OTP_SESSION",
        });
      }

      user = await prisma.user.create({
        data: {
          name: pendingUser.name === undefined ? null : pendingUser.name,
          email: pendingUser.email,
          password: pendingUser.password,
          OneTimeID,
          userVerified: true,
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
    }

    await redis.del(otpKey, pendingKey);

    // user cache update
    const cacheKey = `user:profile:${user.OneTimeID}`;
    await redis.set(cacheKey, JSON.stringify(user), "EX", 7 * 24 * 60 * 60);

    const token = generateToken({
      id: String(user.id),
      name: user.name || "",
      email: user.email,
      OneTimeID: user.OneTimeID || "",
      userVerified: user.userVerified,
    });

    res.cookie("token", token, {
      ...getCookieOptions(),
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.clearCookie("otp_verification", getCookieOptions());

    if (pendingUser.kind !== "login") {
      try {
        const welcomeEmailHtml = welcomeEmailTemplate(user.name ?? undefined);

        await sendEmail(
          user.email,
          "Welcome to ProjectAPI!",
          `Hello ${user.name}, welcome!`,
          welcomeEmailHtml
        );
      } catch (emailError) {
        console.error("Welcome email failed:", emailError);
      }
    }

    return res.status(201).json({
      success: true,
      message: "Email verified and account created successfully.",
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
  } catch (error: any) {
    console.error(
      `[${new Date().toISOString()}] OTP verification failed:`,
      error
    );

    return res.status(500).json({
      success: false,
      message: "OTP verification failed. Please try again.",
      ...(process.env.NODE_ENV === "development" && {
        error: error instanceof Error ? error.message : "Unknown error",
      }),
    });
  }
};

// * Resend OTP Route
export const NewOtpsend = async (req: Request, res: Response) => {
  try {
    const otpUser = (req as any).otpUser;

    const {  OneTimeID } = otpUser || {};
    console.log("Resend OTP request for registration ID:", otpUser);

    if (!OneTimeID) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const pendingData = await redis.get(`pending:${OneTimeID}`);

    if (!pendingData) {
      return res.status(400).json({
        success: false,
        message: "Registration session expired. Please register again.",
        code: "REGISTRATION_SESSION_EXPIRED",
      });
    }

    const parsedPendingData = JSON.parse(pendingData);

    const otp = await generateOtp();

    const otpKey = `otp:${OneTimeID}`;

    await redis.set(otpKey, otp, "EX", 5 * 60);

    const otpEmailHtml = otpEmailTemplate(otp, parsedPendingData.email, 5);

    const SendOtpEmail = await sendEmail(
      parsedPendingData.email,
      "Your OTP Code",
      otp,
      otpEmailHtml
    );

    if (!SendOtpEmail) {
      await redis.del(otpKey);
      await redis.del(`pending:${OneTimeID}`);

      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email",
      });
    }

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
