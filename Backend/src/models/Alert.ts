import mongoose, { Schema, Document } from 'mongoose';

export interface IAlert extends Document {
  symbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const AlertSchema: Schema = new Schema({
  symbol: { type: String, required: true },
  targetPrice: { type: Number, required: true },
  condition: { type: String, enum: ['above', 'below'], required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IAlert>('Alert', AlertSchema);
