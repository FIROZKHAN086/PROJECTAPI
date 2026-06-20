import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/prisma.js"; 
import { generateToken } from "../utils/jwt.js";
import { v4 as uuidv4 } from "uuid";


 // Register Route
 
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false,
        message: "All fields are required" 
      });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: "User already exists" 
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a unique OneTime ID
    const OneTimeID = uuidv4();

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        OneTimeID: OneTimeID,
        Role: "USER", 
      },
    });

    // Generate JWT token
    const token = generateToken({
      id: user.id.toString(),
      name: user.name || "",
      email: user.email,
      Role: user.Role,
      OneTimeID: user.OneTimeID || "",
    });

    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        OneTimeID: user.OneTimeID,
        token: token,
      },
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] [ERROR] Registration failed:`, error);
    return res.status(500).json({ 
      success: false,
      message: "Registration failed",
      error: process.env.NODE_ENV === "development" ? error : undefined 
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
        message: "All fields are required" 
      });
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Compare  password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid credentials" 
      });
    }

    // Generate JWT token
    const token = generateToken({
      id: user.id.toString(),
      name: user.name || "",
      email: user.email,
      Role: user.Role,
      OneTimeID: user.OneTimeID || "",
    });

    // Set token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
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
        token: token,
      },
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] [ERROR] Login failed:`, error);
    return res.status(500).json({ 
      success: false,
      message: "Login failed",
      error: process.env.NODE_ENV === "development" ? error : undefined 
    });
  }
};


// Logout Route
 
export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] [ERROR] Logout failed:`, error);
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};