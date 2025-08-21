import { Router } from "express";
import {
	upsertExchangeRate,
	getExchangeRate,
	getAllExchangeRates,
} from "../controllers/exchangeRateController";

const router = Router();

router.post("/", upsertExchangeRate);
router.get("/", getAllExchangeRates);
router.get("/:fromCurrency/:toCurrency", getExchangeRate);

export default router;
