import mongoose from "mongoose";
import type { ITransaction } from "../types/index.js";
declare const Transaction: mongoose.Model<ITransaction, {}, {}, {}, mongoose.Document<unknown, {}, ITransaction, {}, {}> & ITransaction & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Transaction;
//# sourceMappingURL=Transaction.d.ts.map