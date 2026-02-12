import type { Request, Response } from "express";
export declare const getAllProducts: (req: Request, res: Response) => Promise<void>;
export declare const getRandomProducts: (req: Request, res: Response) => Promise<void>;
export declare const getProductById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const searchProducts: (req: Request, res: Response) => Promise<void>;
export declare const addRating: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getProductRatings: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=product.controller.d.ts.map