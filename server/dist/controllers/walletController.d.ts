import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/index.js";
export declare const getWallets: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getWalletBalance: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const fundWallet: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const convertFunds: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=walletController.d.ts.map