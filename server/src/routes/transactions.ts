import { authenticateToken } from "./../middleware/auth";
import { Router } from "express";
import {
	getTransactions,
	sendMoney,
	getTransactionById,
} from "../controllers/transactionController";

const router = Router();

router.get("/", authenticateToken, getTransactions); // GET /api/transactions
router.post("/send", authenticateToken, sendMoney); // POST /api/transactions/send
router.get("/:id", authenticateToken, getTransactionById); // GET /api/transactions/:id

export default router;
