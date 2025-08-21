import mongoose, { Schema } from "mongoose";
const exchangeRateSchema = new Schema({
    fromCurrency: { type: String, required: true },
    toCurrency: { type: String, required: true },
    buyRate: { type: Number, required: true, min: 0 },
    sellRate: { type: Number, required: true, min: 0 },
    lastUpdated: { type: Date, default: Date.now },
});
exchangeRateSchema.index({ fromCurrency: 1, toCurrency: 1 }, { unique: true });
const ExchangeRate = mongoose.model("ExchangeRate", exchangeRateSchema);
export default ExchangeRate;
//# sourceMappingURL=ExchangeRate.js.map