import mongoose, { Schema } from "mongoose";
const walletSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    currency: {
        type: String,
        enum: ["USD", "GBP", "EUR", "NGN"],
        required: true,
    },
    balance: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true,
});
walletSchema.index({ userId: 1, currency: 1 }, { unique: true });
const Wallet = mongoose.model("Wallet", walletSchema);
export default Wallet;
//# sourceMappingURL=Wallet.js.map