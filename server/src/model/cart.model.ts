import mongoose, { Schema, Types } from "mongoose";

interface CartItem {
  product: Types.ObjectId;
  quantity: number;
}

export interface CartDocument extends mongoose.Document {
  user: Types.ObjectId;
  items: CartItem[];
}

const cartSchema = new Schema<CartDocument>(
  {
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
  },
  { timestamps: true },
);


export default mongoose.model<CartDocument>("Cart", cartSchema);