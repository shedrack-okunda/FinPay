import mongoose, { Schema } from "mongoose";
import type { IWallet } from "../types/index";

const walletSchema = new Schema<IWallet>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		currency: {
			type: String,
			enum: ["USD", "GBP", "EUR", "NGN"],
			required: true,
		},
		balance: { type: Number, default: 0, min: 0 },
		isActive: { type: Boolean, default: true },
	},
	{
		timestamps: true,
	}
);

walletSchema.index({ userId: 1, currency: 1 }, { unique: true });

const Wallet = mongoose.model<IWallet>("Wallet", walletSchema);
export default Wallet;
