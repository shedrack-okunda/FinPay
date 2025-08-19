import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/auth.js";
// import userRoutes from "./routes/users.js";
import walletRoutes from "./routes/wallets.js";
import transactionRoutes from "./routes/transactions.js";
import invoiceRoutes from "./routes/invoices.js";
import cardRoutes from "./routes/cards.js";
import beneficiaryRoutes from "./routes/beneficiaries.js";
import notificationRoutes from "./routes/notification.js";
import exchangeRateRoutes from "./routes/exchangeRate.js";
import dashboardRoutes from "./routes/dashboard.js";

import { errorHandler } from "./middleware/errorHandler.js";
import { authenticateToken } from "./middleware/auth.js";
import logger from "./utils/logger.js";
import { initializeSocketIO } from "./services/socketService.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
	cors: {
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
		credentials: true,
	},
});

// Security middleware
app.use(helmet());
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
		credentials: true,
	})
);

// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Initialize Socket.IO
initializeSocketIO(io);

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/users", authenticateToken, userRoutes);
app.use("/api/wallets", authenticateToken, walletRoutes);
app.use("/api/transactions", authenticateToken, transactionRoutes);
app.use("/api/invoices", authenticateToken, invoiceRoutes);
app.use("/api/cards", authenticateToken, cardRoutes);
app.use("/api/beneficiaries", authenticateToken, beneficiaryRoutes);
app.use("/api/notifications", authenticateToken, notificationRoutes);
app.use("/api/exchange-rates", exchangeRateRoutes);
app.use("/api/dashboard", authenticateToken, dashboardRoutes);

// Health check
app.get("/health", (req, res) => {
	res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
});

// Error handling
app.use(errorHandler);

// Database connection
mongoose
	.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/finpay")
	.then(() => {
		logger.info("Connected to MongoDB");
	})
	.catch((error) => {
		logger.error("MongoDB connection error:", error);
		process.exit(1);
	});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	logger.info(`Server running on port ${PORT}`);
});

export { io };
