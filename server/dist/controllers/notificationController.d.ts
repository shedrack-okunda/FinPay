import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/index.js";
export declare const createNotification: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getNotifications: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const markAsRead: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteNotification: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=notificationController.d.ts.map