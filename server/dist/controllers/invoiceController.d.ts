import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/index.js";
export declare const getInvoices: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const createInvoice: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateInvoice: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteInvoice: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=invoiceController.d.ts.map