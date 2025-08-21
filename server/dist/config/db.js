import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
dotenv.config();
const db = process.env.MONGODB_URI;
export const connectDB = async () => {
    try {
        await mongoose.connect(db);
        logger.info("Connected to MongoDB");
    }
    catch (error) {
        logger.error("MongoDB connection error:", error);
        process.exit(1);
    }
};
//# sourceMappingURL=db.js.map