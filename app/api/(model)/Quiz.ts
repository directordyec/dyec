import mongoose, { Schema, Document } from "mongoose";

export interface IQuiz extends Document {
  question: string;
  options: string[];
  answer: string;
  subject: mongoose.Schema.Types.ObjectId; // Reference to the subject
}

const QuizSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject", // Reference to the Subject model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Quiz = mongoose.models.Quiz || mongoose.model<IQuiz>("Quiz", QuizSchema);
export default Quiz;