import mongoose, { Document, model, Schema } from "mongoose";
const ratingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    review: {
        type: String,
        trim: true,
        maxlength: 1000,
    },
}, {
    timestamps: true,
});
// Compound index to ensure one rating per user per product
ratingSchema.index({ user: 1, product: 1 }, { unique: true });
const Rating = model("Rating", ratingSchema);
export default Rating;
//# sourceMappingURL=rating.model.js.map