import mongoose, { Document } from 'mongoose';
export interface ITransaction extends Document {
    hash: string;
    from: string;
    to: string;
    value: number;
    chain: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
}
declare const _default: mongoose.Model<ITransaction, {}, {}, {}, mongoose.Document<unknown, {}, ITransaction, {}, {}> & ITransaction & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Transaction.d.ts.map