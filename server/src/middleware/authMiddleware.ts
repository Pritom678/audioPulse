import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { ENV } from "../lib/env.js";
import type { Request, Response, NextFunction } from "express";

interface JwtPayload {
  id: string;
  role: "USER" | "ADMIN";
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // console.log("=== Auth Middleware ===");
    // console.log("Cookies received:", req.cookies);
    // console.log("Headers:", req.headers.cookie);

    const token = req.cookies?.jwt;

    if (!token) {
      // console.log("❌ No token found in cookies");
      return res.status(401).json({ message: "Not Authorized - No Token" });
    }

    // console.log("✅ Token found, verifying...");
    const decoded = jwt.verify(token, ENV.JWT_SECRET!) as JwtPayload;
    // console.log("✅ Token decoded:", { id: decoded.id, role: decoded.role });

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      // console.log("❌ User not found in database");
      return res.status(401).json({ message: "User not Found" });
    }

    // console.log("✅ User authenticated:", user.email);
    (req as any).user = user;
    next();
  } catch (error) {
    // console.error("❌ Auth middleware error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
