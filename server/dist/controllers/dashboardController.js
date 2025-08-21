import Wallet from "../models/Wallet.js";
import Transaction from "../models/Transaction.js";
import Invoice from "../models/Invoice.js";
import Card from "../models/Card.js";
import ExchangeRate from "../models/ExchangeRate.js";
export const getDashboardStats = async (req, res, next) => {
    try {
        // Get wallet balances
        const wallets = await Wallet.find({
            userId: req.user.userId,
            isActive: true,
        });
        // Get recent transactions
        const recentTransactions = await Transaction.find({
            userId: req.user.userId,
        })
            .populate("beneficiaryId", "name")
            .sort({ createdAt: -1 })
            .limit(5);
        // Get invoice summary
        const invoiceStats = await Invoice.aggregate([
            { $match: { userId: req.user.userId } },
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 },
                    totalAmount: { $sum: "$total" },
                },
            },
        ]);
        // Get card count
        const cardCount = await Card.countDocuments({
            userId: req.user.userId,
            isActive: true,
        });
        // Get exchange rates
        const exchangeRates = await ExchangeRate.find()
            .sort({ lastUpdated: -1 })
            .limit(10);
        res.json({
            wallets: wallets.map((wallet) => ({
                currency: wallet.currency,
                balance: wallet.balance,
            })),
            recentTransactions,
            invoiceStats,
            cardCount,
            exchangeRates,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=dashboardController.js.map