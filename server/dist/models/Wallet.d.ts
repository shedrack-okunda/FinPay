import mongoose from "mongoose";
import type { IWallet } from "../types/index.js";
declare const Wallet: mongoose.Model<IWallet, {}, {}, {}, mongoose.Document<unknown, {}, IWallet, {}, {}> & IWallet & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Wallet;
//# sourceMappingURL=Wallet.d.ts.map