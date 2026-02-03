import express, { Router } from "express";
import { getCurrentUser, login, logout, signup, } from "../controller/auth.controller.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getCurrentUser);
export default router;
//# sourceMappingURL=auth.js.map