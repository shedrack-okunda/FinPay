import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();

const db = process.env.MONGODB_URI as string;

export const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(db);
		logger.info("Connected to MongoDB");
	} catch (error) {
		logger.error("MongoDB connection error:", error);
		process.exit(1);
	}
};
