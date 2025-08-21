import ExchangeRate from "../models/ExchangeRate.js";
// Create or update exchange rate
export const upsertExchangeRate = async (req, res, next) => {
    try {
        const { fromCurrency, toCurrency, buyRate, sellRate } = req.body;
        if (!fromCurrency || !toCurrency || !buyRate || !sellRate) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const exchangeRate = await ExchangeRate.findOneAndUpdate({ fromCurrency, toCurrency }, { buyRate, sellRate, lastUpdated: new Date() }, { upsert: true, new: true });
        res.status(201).json({
            message: "Exchange rate upserted successfully",
            exchangeRate,
        });
    }
    catch (error) {
        next(error);
    }
};
// Get exchange rate
export const getExchangeRate = async (req, res, next) => {
    try {
        const { fromCurrency, toCurrency } = req.params;
        const rate = await ExchangeRate.findOne({ fromCurrency, toCurrency });
        if (!rate) {
            return res.status(404).json({ message: "Rate not found" });
        }
        res.json(rate);
    }
    catch (error) {
        next(error);
    }
};
// Get all exchange rates
export const getAllExchangeRates = async (req, res, next) => {
    try {
        const rates = await ExchangeRate.find();
        res.json(rates);
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=exchangeRateController.js.map