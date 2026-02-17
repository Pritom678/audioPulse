import jwt from "jsonwebtoken";
import type { Types } from "mongoose";
import { ENV } from "./env.js";
import type { Response } from "express";

interface TokenUser {
  _id: Types.ObjectId | string;
  role: "USER" | "ADMIN";
}

export const generateToken = (user: TokenUser, res: Response): string => {
  const { JWT_SECRET, NODE_ENV } = ENV;

  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const token = jwt.sign(
    {
      id: user._id.toString(),
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  // Determine if we're in production based on environment or if using HTTPS
  const isProduction = NODE_ENV === "production";

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: isProduction, // true in production, false in development
    sameSite: isProduction ? "none" : "lax", // "none" for cross-origin in production
    path: "/",
  });

  // console.log("Cookie set with options:", {
  //   httpOnly: true,
  //   secure: isProduction,
  //   sameSite: isProduction ? "none" : "lax",
  //   maxAge: "7 days",
  // });

  return token;
};
