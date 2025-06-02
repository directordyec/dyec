
// api/(model)/Meeting.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IMeeting extends Document {
  name: string;
  email: string;
  phone: string;
  course: string;
  year: string;
  preferredDate: string;
  preferredTime: string;
  topics: string[];
  message: string;
  approved: boolean;
  timestamp: Date;
}

const MeetingSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    course: { type: String, required: true },
    year: { type: String, required: true },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    topics: { type: [String], required: true },
    message: { type: String, required: false },
    approved: { type: Boolean, required: true },
    timestamp: { type: Date, default: Date.now }
    }, {
      timestamps: true,
    }
);

const Meeting = mongoose.models.Meeting || mongoose.model<IMeeting>('Meeting', MeetingSchema); 
export default Meeting;