import mongoose, { Schema } from "mongoose";
import type { ITransaction } from "../types/index";

const transactionSchema = new Schema<ITransaction>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		type: {
			type: String,
			enum: ["send", "receive", "convert", "fund"],
			required: true,
		},
		fromWallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
		toWallet: { type: Schema.Types.ObjectId, ref: "Wallet" },
		amount: { type: Number, required: true, min: 0 },
		currency: { type: String, required: true },
		fee: { type: Number, default: 0, min: 0 },
		status: {
			type: String,
			enum: ["pending", "processing", "completed", "failed", "refunded"],
			default: "pending",
		},
		reference: { type: String, required: true, unique: true },
		description: { type: String, trim: true },
		beneficiaryId: { type: Schema.Types.ObjectId, ref: "Beneficiary" },
	},
	{
		timestamps: true,
	}
);

transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index({ reference: 1 });
transactionSchema.index({ status: 1 });

const Transaction = mongoose.model<ITransaction>(
	"Transaction",
	transactionSchema
);
export default Transaction;
