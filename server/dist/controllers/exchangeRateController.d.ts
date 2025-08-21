import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/index.js";
export declare const upsertExchangeRate: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getExchangeRate: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllExchangeRates: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=exchangeRateController.d.ts.map