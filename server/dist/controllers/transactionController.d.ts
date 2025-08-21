import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/index.js";
export declare const getTransactions: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const sendMoney: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getTransactionById: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=transactionController.d.ts.map