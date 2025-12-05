import mongoose, { Schema, Document } from 'mongoose';
const WalletSchema = new Schema({
    address: { type: String, required: true },
    label: { type: String, required: true },
    chain: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Wallet', WalletSchema);
//# sourceMappingURL=Wallet.js.map