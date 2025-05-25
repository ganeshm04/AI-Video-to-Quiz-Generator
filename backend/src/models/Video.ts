// backend/src/models/Video.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topic?: string;
}

export interface ISegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  questions: IQuestion[];
}

export interface IVideo extends Document {
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  duration?: number;
  uploadDate: Date;
  status: 'uploaded' | 'transcribing' | 'processing' | 'completed' | 'error';
  progress: number;
  currentStep: string;
  transcript?: string;
  segments: ISegment[];
  errorMessage?: string;
}

const QuestionSchema = new Schema({
  id: { type: String, required: true },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: Number, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  topic: String
});

const SegmentSchema = new Schema({
  id: { type: String, required: true },
  startTime: { type: Number, required: true },
  endTime: { type: Number, required: true },
  text: { type: String, required: true },
  questions: [QuestionSchema]
});

const VideoSchema = new Schema({
  id: { type: String, required: true, unique: true },
  filename: { type: String, required: true },
  originalName: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  duration: Number,
  uploadDate: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['uploaded', 'transcribing', 'processing', 'completed', 'error'],
    default: 'uploaded'
  },
  progress: { type: Number, default: 0 },
  currentStep: { type: String, default: 'Uploaded' },
  transcript: String,
  segments: [SegmentSchema],
  errorMessage: String
}, {
  timestamps: true
});

export default mongoose.model<IVideo>('Video', VideoSchema);