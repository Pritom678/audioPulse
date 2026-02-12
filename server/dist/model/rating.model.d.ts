import mongoose, { Document } from "mongoose";
export interface IRating extends Document {
    user: mongoose.Types.ObjectId;
    product: mongoose.Types.ObjectId;
    rating: number;
    review?: string;
    createdAt: Date;
    updatedAt: Date;
}
declare const Rating: mongoose.Model<IRating, {}, {}, {}, mongoose.Document<unknown, {}, IRating, {}, mongoose.DefaultSchemaOptions> & IRating & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IRating>;
export default Rating;
//# sourceMappingURL=rating.model.d.ts.map