import type { Request, Response } from "express";
import Product from "../model/product.model.js";
import mongoose from "mongoose";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ isActive: true });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRandomProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.aggregate([{ $sample: { size: 3 } }]);
    res.json(products);
  } catch (error) {
    console.error("Error fetching random products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
