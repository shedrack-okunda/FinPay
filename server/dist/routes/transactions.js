import { authenticateToken } from "./../middleware/auth.js";
import { Router } from "express";
import { getTransactions, sendMoney, getTransactionById, } from "../controllers/transactionController.js";
const router = Router();
router.get("/", authenticateToken, getTransactions); // GET /api/transactions
router.post("/send", authenticateToken, sendMoney); // POST /api/transactions/send
router.get("/:id", authenticateToken, getTransactionById); // GET /api/transactions/:id
export default router;
//# sourceMappingURL=transactions.js.map