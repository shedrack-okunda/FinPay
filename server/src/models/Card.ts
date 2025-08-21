import mongoose, { Schema } from "mongoose";
import crypto from "crypto";
import type { ICard } from "../types/index";

const cardSchema = new Schema<ICard>(
	{
		userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
		cardName: { type: String, required: true, trim: true },
		cardType: {
			type: String,
			enum: ["virtual", "physical"],
			required: true,
		},
		cardBrand: {
			type: String,
			enum: ["visa", "mastercard"],
			required: true,
		},
		cardNumber: { type: String, required: true },
		expiryDate: { type: String, required: true },
		cvv: { type: String, required: true },
		currency: { type: String, required: true },
		balance: { type: Number, default: 0, min: 0 },
		isActive: { type: Boolean, default: true },
		fee: { type: Number, required: true, min: 0 },
	},
	{
		timestamps: true,
	}
);

// Encrypt sensitive data before saving
cardSchema.pre("save", function (next) {
	if (this.isModified("cardNumber")) {
		this.cardNumber = encrypt(this.cardNumber);
	}
	if (this.isModified("cvv")) {
		this.cvv = encrypt(this.cvv);
	}
	next();
});

function encrypt(text: string): string {
	const algorithm = "aes-256-cbc";
	const key = crypto.scryptSync(
		process.env.ENCRYPTION_KEY || "default-key",
		"salt",
		32
	);
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createDecipheriv(algorithm, key, iv);
	let encrypted = cipher.update(text, "utf8", "hex");
	encrypted += cipher.final("hex");
	return iv.toString("hex") + ":" + encrypted;
}

cardSchema.index({ userId: 1 });

const Card = mongoose.model<ICard>("Card", cardSchema);
export default Card;
