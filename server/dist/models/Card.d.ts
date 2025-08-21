import mongoose from "mongoose";
import type { ICard } from "../types/index.js";
declare const Card: mongoose.Model<ICard, {}, {}, {}, mongoose.Document<unknown, {}, ICard, {}, {}> & ICard & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Card;
//# sourceMappingURL=Card.d.ts.map