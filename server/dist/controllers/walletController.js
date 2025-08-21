import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";
import { generateReference } from "../utils/helpers.js";
import { getSocketIO } from "../services/socketService.js";
export const getWallets = async (req, res, next) => {
    try {
        const wallets = await Wallet.find({
            userId: req.user.userId,
            isActive: true,
        });
        res.json({ wallets });
    }
    catch (error) {
        next(error);
    }
};
export const getWalletBalance = async (req, res, next) => {
    try {
        const { currency } = req.params;
        if (!currency) {
            return res.status(400).json({ message: "Currency is required" });
        }
        const wallet = await Wallet.findOne({
            userId: req.user.userId,
            currency: currency.toUpperCase(),
            isActive: true,
        });
        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }
        res.json({ balance: wallet.balance, currency: wallet.currency });
    }
    catch (error) {
        next(error);
    }
};
export const fundWallet = async (req, res, next) => {
    try {
        const { currency, amount, paymentMethod } = req.body;
        if (!currency || !amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid input data" });
        }
        const wallet = await Wallet.findOne({
            userId: req.user.userId,
            currency: currency.toUpperCase(),
            isActive: true,
        });
        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }
        // Create funding transaction
        const transaction = new Transaction({
            userId: req.user.userId,
            type: "fund",
            toWallet: wallet._id,
            amount,
            currency: currency.toUpperCase(),
            fee: 0,
            status: "processing",
            reference: generateReference(),
            description: `Wallet funding via ${paymentMethod}`,
        });
        await transaction.save();
        // Update wallet balance
        wallet.balance += amount;
        await wallet.save();
        // Update transaction status
        transaction.status = "completed";
        await transaction.save();
        // Emit real-time update
        const io = getSocketIO();
        io.to(req.user.userId).emit("walletUpdate", {
            currency: wallet.currency,
            balance: wallet.balance,
        });
        res.json({
            message: "Wallet funded successfully",
            transaction: {
                id: transaction._id,
                amount: transaction.amount,
                currency: transaction.currency,
                reference: transaction.reference,
                status: transaction.status,
            },
            newBalance: wallet.balance,
        });
    }
    catch (error) {
        next(error);
    }
};
export const convertFunds = async (req, res, next) => {
    try {
        const { fromCurrency, toCurrency, amount } = req.body;
        if (!fromCurrency || !toCurrency || !amount || amount <= 0) {
            return res.status(400).json({ message: "Invalid conversion data" });
        }
        const fromWallet = await Wallet.findOne({
            userId: req.user.userId,
            currency: fromCurrency.toUpperCase(),
            isActive: true,
        });
        const toWallet = await Wallet.findOne({
            userId: req.user.userId,
            currency: toCurrency.toUpperCase(),
            isActive: true,
        });
        if (!fromWallet || !toWallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }
        if (fromWallet.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }
        // Mock exchange rate (in production, fetch from external API)
        const exchangeRate = 1.2; // Example rate
        const convertedAmount = amount * exchangeRate;
        const fee = amount * 0.001; // 0.1% fee
        // Create conversion transaction
        const transaction = new Transaction({
            userId: req.user.userId,
            type: "convert",
            fromWallet: fromWallet._id,
            toWallet: toWallet._id,
            amount,
            currency: fromCurrency.toUpperCase(),
            fee,
            status: "processing",
            reference: generateReference(),
            description: `Convert ${fromCurrency} to ${toCurrency}`,
        });
        await transaction.save();
        // Update wallet balances
        fromWallet.balance -= amount + fee;
        toWallet.balance += convertedAmount;
        await Promise.all([fromWallet.save(), toWallet.save()]);
        transaction.status = "completed";
        await transaction.save();
        // Emit real-time updates
        const io = getSocketIO();
        io.to(req.user.userId).emit("walletUpdate", {
            wallets: [
                { currency: fromWallet.currency, balance: fromWallet.balance },
                { currency: toWallet.currency, balance: toWallet.balance },
            ],
        });
        res.json({
            message: "Funds converted successfully",
            transaction: {
                id: transaction._id,
                reference: transaction.reference,
                fromAmount: amount,
                toAmount: convertedAmount,
                exchangeRate,
                fee,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=walletController.js.map