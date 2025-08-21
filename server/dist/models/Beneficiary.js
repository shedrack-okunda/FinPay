import mongoose, { Schema } from "mongoose";
const beneficiarySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    accountNumber: { type: String, trim: true },
    bankName: { type: String, trim: true },
    finpayTag: { type: String, trim: true },
    type: {
        type: String,
        enum: ["finpay", "bank", "international"],
        required: true,
    },
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true,
});
beneficiarySchema.index({ userId: 1 });
const Beneficiary = mongoose.model("Beneficiary", beneficiarySchema);
export default Beneficiary;
//# sourceMappingURL=Beneficiary.js.map