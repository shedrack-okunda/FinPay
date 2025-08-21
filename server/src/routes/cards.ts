import { authenticateToken } from "./../middleware/auth";
import { Router } from "express";
import {
	getCards,
	createCard,
	toggleCardStatus,
} from "../controllers/cardController";

const router = Router();

router.get("/", authenticateToken, getCards); // GET /api/cards
router.post("/", authenticateToken, createCard); // POST /api/cards
router.patch("/:id/status", authenticateToken, toggleCardStatus); // PATCH /api/cards/:id/status

export default router;
