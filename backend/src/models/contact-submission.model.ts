import mongoose, { Schema, Document } from "mongoose";

export interface IContactSubmission extends Document {
  name: string;
  email: string;
  phone: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ContactSubmissionSchema = new Schema<IContactSubmission>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

ContactSubmissionSchema.index({ isRead: 1, createdAt: -1 });
ContactSubmissionSchema.index({ email: 1 });

export const ContactSubmission = mongoose.model<IContactSubmission>(
  "ContactSubmission",
  ContactSubmissionSchema
);
