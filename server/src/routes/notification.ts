import { Router } from "express";
import {
	createNotification,
	getNotifications,
	markAsRead,
	deleteNotification,
} from "../controllers/notificationController";

const router = Router();

router.post("/", createNotification);
router.get("/", getNotifications);
router.put("/:id/read", markAsRead);
router.delete("/:id", deleteNotification);

export default router;
