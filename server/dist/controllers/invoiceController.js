import Invoice from "../models/Invoice.js";
import { generateInvoiceNumber } from "../utils/helpers.js";
export const getInvoices = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const status = req.query.status;
        const filter = { userId: req.user.userId };
        if (status && status !== "all")
            filter.status = status;
        const invoices = await Invoice.find(filter)
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const total = await Invoice.countDocuments(filter);
        res.json({
            invoices,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
        });
    }
    catch (error) {
        next(error);
    }
};
export const createInvoice = async (req, res, next) => {
    try {
        const { customerName, customerEmail, billingAddress, items, currency, dueDate, tax = 0, } = req.body;
        if (!customerName || !customerEmail || !items || items.length === 0) {
            return res.status(400).json({ message: "Required fields missing" });
        }
        // Calculate totals
        const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
        const total = subtotal + tax;
        const invoice = new Invoice({
            userId: req.user.userId,
            invoiceNumber: await generateInvoiceNumber(),
            customerName,
            customerEmail,
            billingAddress,
            items,
            subtotal,
            tax,
            total,
            currency: currency.toUpperCase(),
            dueDate: new Date(dueDate),
            status: "pending",
        });
        await invoice.save();
        // Send invoice email
        // await sendInvoiceEmail(invoice);
        res.status(201).json({
            message: "Invoice created successfully",
            invoice,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateInvoice = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const invoice = await Invoice.findOneAndUpdate({ _id: id, userId: req.user.userId }, updates, { new: true, runValidators: true });
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.json({
            message: "Invoice updated successfully",
            invoice,
        });
    }
    catch (error) {
        next(error);
    }
};
export const deleteInvoice = async (req, res, next) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findOneAndDelete({
            _id: id,
            userId: req.user.userId,
        });
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.json({ message: "Invoice deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=invoiceController.js.map