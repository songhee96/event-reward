import { Schema } from 'mongoose';

export const RewardSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  type: { type: String, enum: ['ITEM', 'POINT', 'COUPON'], required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
});