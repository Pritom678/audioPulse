import express from "express";
import type { Router } from "express";
import { getAllProducts, getRandomProducts } from "../controller/product.controller.js";

const router: Router = express.Router();

router.get("/", getAllProducts);
router.get("/random", getRandomProducts);
export default router;
