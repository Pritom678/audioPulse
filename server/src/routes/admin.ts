import express, { Router } from "express";
import {
  getDashboardStats,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  permanentDeleteProduct,
} from "../controller/admin.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router: Router = express.Router();

// All routes require authentication + admin role
router.use(protect, adminOnly);

// Dashboard stats
router.get("/stats", getDashboardStats);

// Product management
router.get("/products", getAllProductsAdmin);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);
router.delete("/products/:id/permanent", permanentDeleteProduct);

export default router;
