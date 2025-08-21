import mongoose, { Schema } from "mongoose";
const invoiceItemSchema = new Schema({
    description: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1 },
    rate: { type: Number, required: true, min: 0 },
    amount: { type: Number, required: true, min: 0 },
});
const invoiceSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    invoiceNumber: { type: String, required: true, unique: true },
    customerName: { type: String, required: true, trim: true },
    customerEmail: { type: String, required: true, lowercase: true },
    billingAddress: { type: String, required: true, trim: true },
    items: [invoiceItemSchema],
    subtotal: { type: Number, required: true, min: 0 },
    tax: { type: Number, default: 0, min: 0 },
    total: { type: Number, required: true, min: 0 },
    currency: { type: String, required: true },
    status: {
        type: String,
        enum: ["draft", "pending", "processing", "paid", "due", "overdue"],
        default: "draft",
    },
    dueDate: { type: Date, required: true },
    paidAt: { type: Date },
}, {
    timestamps: true,
});
invoiceSchema.index({ userId: 1, createdAt: -1 });
invoiceSchema.index({ invoiceNumber: 1 });
invoiceSchema.index({ status: 1 });
const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
//# sourceMappingURL=Invoice.js.map