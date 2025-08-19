import { authenticateToken } from "./../middleware/auth.js";
import { Router } from "express";
import {
	getInvoices,
	createInvoice,
	updateInvoice,
	deleteInvoice,
} from "../controllers/invoiceController.js";

const router = Router();

router.get("/", authenticateToken, getInvoices); // GET /api/invoices
router.post("/", authenticateToken, createInvoice); // POST /api/invoices
router.put("/:id", authenticateToken, updateInvoice); // PUT /api/invoices/:id
router.delete("/:id", authenticateToken, deleteInvoice); // DELETE /api/invoices/:id

export default router;
