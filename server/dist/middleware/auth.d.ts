import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/index.js";
export declare const authenticateToken: (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map