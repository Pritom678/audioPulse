import mongoose, { Document, model, Schema } from "mongoose";
const productSchema = new Schema({
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
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    reviewCount: {
        type: Number,
        default: 0,
        min: 0,
    },
    ratingSum: {
        type: Number,
        default: 0,
        min: 0,
    },
}, {
    timestamps: true,
});
const Product = model("Product", productSchema);
export default Product;
//# sourceMappingURL=product.model.js.map