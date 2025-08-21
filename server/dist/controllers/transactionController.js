import Transaction from "../models/Transaction.js";
import Wallet from "../models/Wallet.js";
import Beneficiary from "../models/Beneficiary.js";
import { generateReference } from "../utils/helpers.js";
import { getSocketIO } from "../services/socketService.js";
export const getTransactions = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const status = req.query.status;
        const type = req.query.type;
        const filter = { userId: req.user.userId };
        if (status)
            filter.status = status;
        if (type)
            filter.type = type;
        const transactions = await Transaction.find(filter)
            .populate("fromWallet", "currency")
            .populate("toWallet", "currency")
            .populate("beneficiaryId", "name")
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const total = await Transaction.countDocuments(filter);
        res.json({
            transactions,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
        });
    }
    catch (error) {
        next(error);
    }
};
export const sendMoney = async (req, res, next) => {
    try {
        const { beneficiaryId, amount, currency, description } = req.body;
        if (!beneficiaryId || !amount || !currency || amount <= 0) {
            return res
                .status(400)
                .json({ message: "Invalid transaction data" });
        }
        const beneficiary = await Beneficiary.findOne({
            _id: beneficiaryId,
            userId: req.user.userId,
            isActive: true,
        });
        if (!beneficiary) {
            return res.status(404).json({ message: "Beneficiary not found" });
        }
        const wallet = await Wallet.findOne({
            userId: req.user.userId,
            currency: currency.toUpperCase(),
            isActive: true,
        });
        if (!wallet) {
            return res.status(404).json({ message: "Wallet not found" });
        }
        const fee = amount * 0.005; // 0.5% transaction fee
        const totalAmount = amount + fee;
        if (wallet.balance < totalAmount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }
        // Create transaction
        const transaction = new Transaction({
            userId: req.user.userId,
            type: "send",
            fromWallet: wallet._id,
            amount,
            currency: currency.toUpperCase(),
            fee,
            status: "processing",
            reference: generateReference(),
            description: description || `Payment to ${beneficiary.name}`,
            beneficiaryId: beneficiary._id,
        });
        await transaction.save();
        // Update wallet balance
        wallet.balance -= totalAmount;
        await wallet.save();
        // Simulate processing delay
        setTimeout(async () => {
            transaction.status = "completed";
            await transaction.save();
            const io = getSocketIO();
            io.to(req.user.userId).emit("transactionUpdate", {
                transactionId: transaction._id,
                status: "completed",
            });
        }, 2000);
        res.json({
            message: "Money sent successfully",
            transaction: {
                id: transaction._id,
                reference: transaction.reference,
                amount: transaction.amount,
                fee: transaction.fee,
                status: transaction.status,
                beneficiary: beneficiary.name,
            },
        });
    }
    catch (error) {
        next(error);
    }
};
export const getTransactionById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.findOne({
            _id: id,
            userId: req.user.userId,
        })
            .populate("fromWallet", "currency")
            .populate("toWallet", "currency")
            .populate("beneficiaryId", "name email");
        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        res.json({ transaction });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=transactionController.js.map