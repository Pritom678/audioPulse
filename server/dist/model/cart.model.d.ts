import mongoose, { Types } from "mongoose";
interface CartItem {
    product: Types.ObjectId;
    quantity: number;
}
export interface CartDocument extends mongoose.Document {
    user: Types.ObjectId;
    items: CartItem[];
}
declare const _default: mongoose.Model<CartDocument, {}, {}, {}, mongoose.Document<unknown, {}, CartDocument, {}, mongoose.DefaultSchemaOptions> & CartDocument & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, CartDocument>;
export default _default;
//# sourceMappingURL=cart.model.d.ts.map