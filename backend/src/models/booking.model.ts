import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  tourSlug: string;
  tourTitle: string;
  fullName: string;
  email: string;
  phone: string;
  travelDate: Date;
  travelers: number;
  notes?: string;
  amount: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<IBooking>(
  {
    tourSlug: { type: String, required: true, index: true },
    tourTitle: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    travelDate: { type: Date, required: true },
    travelers: { type: Number, required: true, min: 1 },
    notes: { type: String, default: "" },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

BookingSchema.index({ status: 1, createdAt: -1 });

export const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
