import type { Request, Response } from "express";
export declare const getDashboardStats: (req: Request, res: Response) => Promise<void>;
export declare const getAllProductsAdmin: (req: Request, res: Response) => Promise<void>;
export declare const createProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const permanentDeleteProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=admin.controller.d.ts.map