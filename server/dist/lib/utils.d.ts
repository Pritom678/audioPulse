import type { Types } from "mongoose";
import type { Response } from "express";
interface TokenUser {
    _id: Types.ObjectId | string;
    role: "USER" | "ADMIN";
}
export declare const generateToken: (user: TokenUser, res: Response) => string;
export {};
//# sourceMappingURL=utils.d.ts.map