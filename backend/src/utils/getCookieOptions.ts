import type { CookieOptions } from "express";
const isProd = process.env.NODE_ENV === "production";

export const getCookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  path: "/",
});
