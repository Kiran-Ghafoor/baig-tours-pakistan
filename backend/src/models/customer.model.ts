import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalSpend: number;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    totalBookings: { type: Number, default: 0 },
    totalSpend: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

CustomerSchema.index({ email: 1 }, { unique: true });
CustomerSchema.index({ status: 1 });
CustomerSchema.index({ name: 1 });

export const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);
