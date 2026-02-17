import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getWishlist, toggleWishlist, } from "../controller/wishlist.controller.js";
const router = express.Router();
router.post("/toggle", protect, toggleWishlist);
router.get("/", protect, getWishlist);
export default router;
//# sourceMappingURL=wishlist.js.map