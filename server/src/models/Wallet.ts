import mongoose, { Schema, Document } from 'mongoose';

export interface IWallet extends Document {
  address: string;
  label: string;
  chain: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const WalletSchema: Schema = new Schema({
  address: { type: String, required: true },
  label: { type: String, required: true },
  chain: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IWallet>('Wallet', WalletSchema);
