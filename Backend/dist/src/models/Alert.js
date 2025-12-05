import mongoose, { Schema, Document } from 'mongoose';
const AlertSchema = new Schema({
    symbol: { type: String, required: true },
    targetPrice: { type: Number, required: true },
    condition: { type: String, enum: ['above', 'below'], required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Alert', AlertSchema);
//# sourceMappingURL=Alert.js.map