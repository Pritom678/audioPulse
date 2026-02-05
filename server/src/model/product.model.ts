import mongoose, { Document, model, Schema } from "mongoose";

export interface IProduct extends Document{
    name: string;
    description?: string;
    price: number;
    images: string[];
    category: string;
    brand?: string;
    stock: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    images: {
      type: [String],
      default: [],
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);


const Product = model<IProduct>("Product", productSchema);

export default Product;