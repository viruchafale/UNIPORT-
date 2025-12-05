import mongoose, { Document } from 'mongoose';
export interface IAlert extends Document {
    symbol: string;
    targetPrice: number;
    condition: 'above' | 'below';
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
}
declare const _default: mongoose.Model<IAlert, {}, {}, {}, mongoose.Document<unknown, {}, IAlert, {}, {}> & IAlert & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Alert.d.ts.map