import type { Request, Response, NextFunction } from "express";
import logger from "../utils/logger.js";

export const errorHandler = (
	error: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.error("Error:", error);

	if (error.name === "ValidationError") {
		return res.status(400).json({
			message: "Validation Error",
			errors: Object.values(error.errors).map((err: any) => err.message),
		});
	}

	if (error.name === "MongoError" && error.code === 11000) {
		return res.status(400).json({
			message: "Duplicate field error",
			field: Object.keys(error.keyValue)[0],
		});
	}

	if (error.name === "JsonWebTokenError") {
		return res.status(401).json({ message: "Invalid token" });
	}

	if (error.name === "TokenExpiredError") {
		return res.status(401).json({ message: "Token expired" });
	}

	res.status(error.statusCode || 500).json({
		message: error.message || "Internal server error",
	});
};
