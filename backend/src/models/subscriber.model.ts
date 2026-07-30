import mongoose, { Schema, Document } from "mongoose";

export interface ISubscriber extends Document {
  email: string;
  isActive: boolean;
  createdAt: Date;
}

const SubscriberSchema = new Schema<ISubscriber>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

SubscriberSchema.index({ isActive: 1 });
SubscriberSchema.index({ createdAt: -1 });

export const Subscriber = mongoose.model<ISubscriber>("Subscriber", SubscriberSchema);
