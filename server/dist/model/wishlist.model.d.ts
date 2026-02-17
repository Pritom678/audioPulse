import mongoose, { Types } from "mongoose";
export interface WishlistDocument extends mongoose.Document {
    user: Types.ObjectId;
    products: Types.ObjectId[];
}
declare const _default: mongoose.Model<WishlistDocument, {}, {}, {}, mongoose.Document<unknown, {}, WishlistDocument, {}, mongoose.DefaultSchemaOptions> & WishlistDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, WishlistDocument>;
export default _default;
//# sourceMappingURL=wishlist.model.d.ts.map