import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/index.js";
export declare const getCards: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const createCard: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const toggleCardStatus: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=cardController.d.ts.map