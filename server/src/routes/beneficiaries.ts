import { Router } from "express";
import {
	createBeneficiary,
	getBeneficiaries,
	getBeneficiaryById,
	updateBeneficiary,
	deleteBeneficiary,
} from "../controllers/beneficiaryController";

const router = Router();

router.post("/", createBeneficiary);
router.get("/", getBeneficiaries);
router.get("/:id", getBeneficiaryById);
router.put("/:id", updateBeneficiary);
router.delete("/:id", deleteBeneficiary);

export default router;
