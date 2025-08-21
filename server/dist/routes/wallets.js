import express from "express";
import { getWallets, getWalletBalance, fundWallet, convertFunds, } from "../controllers/walletController.js";
const router = express.Router();
router.get("/", getWallets);
router.get("/:currency", getWalletBalance);
router.post("/fund", fundWallet);
router.post("/convert", convertFunds);
export default router;
//# sourceMappingURL=wallets.js.map