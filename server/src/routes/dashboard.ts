import { authenticateToken } from "./../middleware/auth.js";
import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";

const router = Router();

router.get("/", authenticateToken, getDashboardStats); // GET /api/dashboard

export default router;
