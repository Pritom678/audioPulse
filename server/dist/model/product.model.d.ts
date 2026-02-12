import mongoose, { Document } from "mongoose";
export interface IProduct extends Document {
    name: string;
    description?: string;
    price: number;
    images: string[];
    category: string;
    brand?: string;
    stock: number;
    isActive: boolean;
    rating: number;
    reviewCount: number;
    ratingSum: number;
    createdAt: Date;
    updatedAt: Date;
}
declare const Product: mongoose.Model<IProduct, {}, {}, {}, mongoose.Document<unknown, {}, IProduct, {}, mongoose.DefaultSchemaOptions> & IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProduct>;
export default Product;
//# sourceMappingURL=product.model.d.ts.map