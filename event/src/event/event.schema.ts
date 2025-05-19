// src/events/event.schema.ts
import { Schema } from 'mongoose';

export const EventSchema = new Schema({
  title: String,
  condition: String,
  startDate: String,
  endDate: String,
  isActive: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
