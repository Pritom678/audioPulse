import Product from "../model/product.model.js";
import Rating from "../model/rating.model.js";
import mongoose from "mongoose";
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });
        res.status(200).json(products);
    }
    catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export const getRandomProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([{ $sample: { size: 3 } }]);
        res.json(products);
    }
    catch (error) {
        console.error("Error fetching random products:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }
    catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export const searchProducts = async (req, res) => {
    try {
        const { q, category, brand, minPrice, maxPrice, sortBy, page = 1, limit = 12, } = req.query;
        const query = { isActive: true };
        if (q && typeof q === "string") {
            query.$or = [
                { name: { $regex: q, $options: "i" } },
                { description: { $regex: q, $options: "i" } },
                { brand: { $regex: q, $options: "i" } },
            ];
        }
        if (category && typeof category === "string")
            query.category = category;
        if (brand && typeof brand === "string")
            query.brand = brand;
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice && !isNaN(Number(minPrice)))
                query.price.$gte = Number(minPrice);
            if (maxPrice && !isNaN(Number(maxPrice)))
                query.price.$lte = Number(maxPrice);
        }
        let sort = { createdAt: -1 };
        if (sortBy === "price-low")
            sort = { price: 1 };
        if (sortBy === "price-high")
            sort = { price: -1 };
        if (sortBy === "rating")
            sort = { rating: -1 };
        const products = await Product.find(query)
            .sort(sort)
            .limit(Number(limit) * Number(page))
            .skip((Number(page) - 1) * Number(limit));
        const total = await Product.countDocuments(query);
        res.json({
            products,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            total,
        });
    }
    catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export const addRating = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { productId } = req.params;
        const { rating, review } = req.body;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        if (!rating || rating < 1 || rating > 5) {
            return res
                .status(400)
                .json({ message: "Rating must be between 1 and 5" });
        }
        const product = await Product.findById(productId);
        if (!product || !product.isActive) {
            return res.status(404).json({ message: "Product not found" });
        }
        const existingRating = await Rating.findOne({
            user: userId,
            product: productId,
        });
        if (existingRating) {
            const oldRating = existingRating.rating;
            existingRating.rating = rating;
            existingRating.review = review;
            await existingRating.save();
            product.ratingSum = product.ratingSum - oldRating + rating;
            await product.save();
        }
        else {
            await Rating.create({ user: userId, product: productId, rating, review });
            product.ratingSum += rating;
            product.reviewCount += 1;
            await product.save();
        }
        product.rating = product.ratingSum / product.reviewCount;
        await product.save();
        res.status(201).json({ message: "Rating added successfully" });
    }
    catch (error) {
        console.error("Add rating error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
export const getProductRatings = async (req, res) => {
    try {
        const { productId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        const ratings = await Rating.find({ product: productId })
            .populate("user", "name")
            .sort({ createdAt: -1 })
            .limit(Number(limit) * Number(page))
            .skip((Number(page) - 1) * Number(limit));
        const total = await Rating.countDocuments({ product: productId });
        res.json({
            ratings,
            totalPages: Math.ceil(total / Number(limit)),
            currentPage: Number(page),
            total,
        });
    }
    catch (error) {
        console.error("Get ratings error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
//# sourceMappingURL=product.controller.js.map