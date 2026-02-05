import type { Request, Response } from "express";
import Product from "../model/product.model.js";

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
    const products = await Product.aggregate([{$sample: {size: 3}}])
    res.json(products);
  } catch (error) {
    console.error("Error fetching random products:", error);
    res.status(500).json({ message: "Server error" });
  }
};