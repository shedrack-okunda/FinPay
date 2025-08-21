import mongoose, { Schema } from "mongoose";
import type { IExchangeRate } from "../types/index";

const exchangeRateSchema = new Schema<IExchangeRate>({
	fromCurrency: { type: String, required: true },
	toCurrency: { type: String, required: true },
	buyRate: { type: Number, required: true, min: 0 },
	sellRate: { type: Number, required: true, min: 0 },
	lastUpdated: { type: Date, default: Date.now },
});

exchangeRateSchema.index({ fromCurrency: 1, toCurrency: 1 }, { unique: true });

const ExchangeRate = mongoose.model<IExchangeRate>(
	"ExchangeRate",
	exchangeRateSchema
);
export default ExchangeRate;
