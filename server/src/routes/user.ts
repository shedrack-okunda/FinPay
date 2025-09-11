import express from "express";
import {
	getAllUsers,
	getUserById,
	getCurrentUser,
	updateUserProfile,
	deleteUser,
} from "../controllers/userController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

// GET current logged-in user profile
router.get("/me/profile", authenticateToken, getCurrentUser);

// UPDATE current user profile
router.put("/me/profile", authenticateToken, updateUserProfile);

// DELETE current user
router.delete("/me", authenticateToken, deleteUser);

// GET user by ID
router.get("/:id", authenticateToken, getUserById);

// GET all users (later you can restrict to admin)
router.get("/", authenticateToken, getAllUsers);

export default router;
