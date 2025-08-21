import { authenticateToken } from "./../middleware/auth";
import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboardController";

const router = Router();

router.get("/", authenticateToken, getDashboardStats); // GET /api/dashboard

export default router;
