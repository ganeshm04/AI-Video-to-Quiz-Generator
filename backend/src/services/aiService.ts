import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

export interface TranscriptionResult {
  text: string;
  segments: Array<{
    start: number;
    end: number;
    text: string;
  }>;
  language: string;
}

export interface Question {
  question: string;
  options: string[];
  correct_answer: number;
  difficulty: string;
  topic: string;
}

export class AIService {
  async transcribeVideo(filePath: string): Promise<TranscriptionResult> {
    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath));

      const response = await axios.post(`${AI_SERVICE_URL}/transcribe`, formData, {
        headers: {
          ...formData.getHeaders(),
        },
        // timeout: 6000000, // 100 minutes timeout
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Transcription error:', error);
      throw new Error('Transcription failed');
    }
  }

  async generateQuestions(text: string, segmentNumber: number, totalSegments: number): Promise<Question[]> {
    try {
      const response = await axios.post(`${AI_SERVICE_URL}/generate-questions`, {
        text,
        segment_number: segmentNumber,
        total_segments: totalSegments,
      });
      // console.log(response.data.questions);
      return response.data.questions;
    } catch (error) {
      console.error('Question generation error:', error);
      throw new Error('Question generation failed');
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${AI_SERVICE_URL}/health`);
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }
}