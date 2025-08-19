import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import type { IUser } from "../types/index.js";

export interface IUserDocument extends IUser, Document {
	_id: string;
	comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUserDocument>(
	{
		firstName: { type: String, required: true, trim: true },
		lastName: { type: String, required: true, trim: true },
		email: { type: String, required: true, unique: true, lowercase: true },
		password: { type: String, required: true, minlength: 6 },
		finpayTag: { type: String, required: true, unique: true },
		phone: { type: String, trim: true },
		dateOfBirth: { type: Date },
		country: { type: String, trim: true },
		occupation: { type: String, trim: true },
		address: { type: String, trim: true },
		avatar: { type: String },
		isEmailVerified: { type: Boolean, default: false },
		isPhoneVerified: { type: Boolean, default: false },
		kycStatus: {
			type: String,
			enum: ["pending", "verified", "rejected"],
			default: "pending",
		},
		twoFactorEnabled: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	try {
		const salt = await bcrypt.genSalt(12);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (error) {
		next(error as Error);
	}
});

userSchema.methods.comparePassword = async function (
	candidatePassword: string
): Promise<boolean> {
	return bcrypt.compare(candidatePassword, this.password);
};

userSchema.index({ email: 1 });
userSchema.index({ finpayTag: 1 });

const User = mongoose.model<IUserDocument>("User", userSchema);
export default User;
