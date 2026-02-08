import jwt from "jsonwebtoken";
import User from "../model/user.model.js";
import { ENV } from "../lib/env.js";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      console.log("No token found in cookies");
      return res.status(401).json({ message: "Not Authorized" });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};
