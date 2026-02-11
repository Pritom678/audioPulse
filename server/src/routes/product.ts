import express from "express";
import type { Router } from "express";
import {
  getAllProducts,
  getProductById,
  getRandomProducts,
  searchProducts,
  addRating,
  getProductRatings,
} from "../controller/product.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router: Router = express.Router();

router.get("/", getAllProducts);
router.get("/random", getRandomProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.post("/:id/rating", protect, addRating);
router.get("/:id/ratings", getProductRatings);

export default router;
