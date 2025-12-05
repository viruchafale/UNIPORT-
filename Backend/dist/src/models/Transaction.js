import mongoose, { Schema, Document } from 'mongoose';
const TransactionSchema = new Schema({
    hash: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    value: { type: Number, required: true },
    chain: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Transaction', TransactionSchema);
//# sourceMappingURL=Transaction.js.map