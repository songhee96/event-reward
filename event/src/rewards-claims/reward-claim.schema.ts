import { Schema } from 'mongoose';

export const RewardClaimSchema = new Schema({
  userId: { type: String, required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
  status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
  message: { type: String }, // 실패 사유 등
  createdAt: { type: Date, default: Date.now },
});
