import mongoose from "mongoose";
import type { IInvoice } from "../types/index.js";
declare const Invoice: mongoose.Model<IInvoice, {}, {}, {}, mongoose.Document<unknown, {}, IInvoice, {}, {}> & IInvoice & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Invoice;
//# sourceMappingURL=Invoice.d.ts.map