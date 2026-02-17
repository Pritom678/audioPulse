import type { Request, Response } from "express";
import Product from "../model/product.model.js";
import mongoose from "mongoose";

// Get dashboard stats
export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const inactiveProducts = await Product.countDocuments({ isActive: false });
    const outOfStock = await Product.countDocuments({ stock: 0 });

    // Get recent products (last 5)
    const recentProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name price images createdAt");

    res.status(200).json({
      stats: {
        totalProducts,
        activeProducts,
        inactiveProducts,
        outOfStock,
      },
      recentProducts,
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all products (including inactive) for admin
export const getAllProductsAdmin = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, images, category, brand, stock } =
      req.body;

    // Validation
    if (!name || !price || !category) {
      return res.status(400).json({
        message: "Name, price, and category are required",
      });
    }

    if (name.length < 3) {
      return res.status(400).json({
        message: "Name must be at least 3 characters",
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    if (stock !== undefined && stock < 0) {
      return res.status(400).json({
        message: "Stock cannot be negative",
      });
    }

    // Validate images array
    if (images && !Array.isArray(images)) {
      return res.status(400).json({
        message: "Images must be an array",
      });
    }

    const newProduct = new Product({
      name,
      description: description || "",
      price,
      images: images || [],
      category,
      brand: brand || "",
      stock: stock || 0,
      isActive: true,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      images,
      category,
      brand,
      stock,
      isActive,
    } = req.body;

    // Type guard for id
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Validation
    if (name !== undefined && name.length < 3) {
      return res.status(400).json({
        message: "Name must be at least 3 characters",
      });
    }

    if (price !== undefined && price <= 0) {
      return res.status(400).json({
        message: "Price must be greater than 0",
      });
    }

    if (stock !== undefined && stock < 0) {
      return res.status(400).json({
        message: "Stock cannot be negative",
      });
    }

    // Update fields
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (images !== undefined) product.images = images;
    if (category !== undefined) product.category = category;
    if (brand !== undefined) product.brand = brand;
    if (stock !== undefined) product.stock = stock;
    if (isActive !== undefined) product.isActive = isActive;

    const updatedProduct = await product.save();

    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete product (permanently delete from database)
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Type guard for id
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Permanently delete product (optional - use with caution)
export const permanentDeleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Type guard for id
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product permanently deleted",
    });
  } catch (error) {
    console.error("Permanent delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
