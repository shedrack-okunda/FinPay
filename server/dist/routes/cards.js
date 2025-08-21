import { authenticateToken } from "./../middleware/auth.js";
import { Router } from "express";
import { getCards, createCard, toggleCardStatus, } from "../controllers/cardController.js";
const router = Router();
router.get("/", authenticateToken, getCards); // GET /api/cards
router.post("/", authenticateToken, createCard); // POST /api/cards
router.patch("/:id/status", authenticateToken, toggleCardStatus); // PATCH /api/cards/:id/status
export default router;
//# sourceMappingURL=cards.js.map