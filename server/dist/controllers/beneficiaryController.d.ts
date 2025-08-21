import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/index.js";
export declare const createBeneficiary: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getBeneficiaries: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getBeneficiaryById: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateBeneficiary: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteBeneficiary: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=beneficiaryController.d.ts.map