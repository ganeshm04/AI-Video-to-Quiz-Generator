export interface VideoData {
  _id?: string; // MongoDB ID
  id: string; // UUID
  filename: string;
  originalName: string;
  mimetype?: string;
  size: number;
  duration?: number;
  status: 'uploaded' | 'transcribing' | 'processing' | 'completed' | 'error';
  progress: number;
  currentStep: string;
  uploadDate?: string;
  transcript?: string;
  segments: VideoSegment[];
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VideoSegment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topic?: string;
}

export interface UploadResponse {
  id: string;
  message: string;
  filename: string;
}

export interface ProcessingStatus {
  status: string;
  progress: number;
  currentStep: string;
  estimatedTimeRemaining?: number;
}