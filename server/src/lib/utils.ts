import jwt from "jsonwebtoken";
import type { Types } from "mongoose";
import { ENV } from "./env.js";
import type { Response } from "express";

interface TokenUser {
  _id: Types.ObjectId | string;
  role: "USER" | "ADMIN";
}

export const generateToken = (user: TokenUser, res: Response): string => {
  const { JWT_SECRET } = ENV;

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

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  return token;
};
