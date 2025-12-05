import mongoose, { Document } from 'mongoose';
export interface IWallet extends Document {
    address: string;
    label: string;
    chain: string;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
}
declare const _default: mongoose.Model<IWallet, {}, {}, {}, mongoose.Document<unknown, {}, IWallet, {}, {}> & IWallet & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Wallet.d.ts.map