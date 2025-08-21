import express from "express";
import { getAllUsers, getUserById, getCurrentUser, updateUserProfile, deleteUser, } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/auth.js";
const router = express.Router();
// GET all users (later you can restrict to admin)
router.get("/", authenticateToken, getAllUsers);
// GET user by ID
router.get("/:id", authenticateToken, getUserById);
// GET current logged-in user profile
router.get("/me/profile", authenticateToken, getCurrentUser);
// UPDATE current user profile
router.put("/me/profile", authenticateToken, updateUserProfile);
// DELETE current user
router.delete("/me", authenticateToken, deleteUser);
export default router;
//# sourceMappingURL=user.js.map