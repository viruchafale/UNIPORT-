import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  hash: string;
  from: string;
  to: string;
  value: number;
  chain: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
  hash: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  value: { type: Number, required: true },
  chain: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
