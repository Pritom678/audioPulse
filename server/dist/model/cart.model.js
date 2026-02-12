import mongoose, { Schema, Types } from "mongoose";
const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    items: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                min: 1,
            },
        },
    ],
}, { timestamps: true });
export default mongoose.model("Cart", cartSchema);
//# sourceMappingURL=cart.model.js.map