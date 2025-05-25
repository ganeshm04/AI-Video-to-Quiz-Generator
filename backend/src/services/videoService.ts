import { AIService, TranscriptionResult } from './aiService';
import Video, { IVideo, ISegment } from '../models/Video';
import { v4 as uuidv4 } from 'uuid';

export class VideoService {
  private aiService: AIService;

  constructor() {
    this.aiService = new AIService();
  }

  async processVideo(videoId: string): Promise<void> {
    try {
      const video = await Video.findOne({ id: videoId });
      if (!video) {
        throw new Error('Video not found');
      }

      // Update status to transcribing
      await this.updateVideoStatus(videoId, 'transcribing', 10, 'Starting transcription...');

      // Transcribe video
      const filePath = `./uploads/${video.filename}`;
      const transcriptionResult = await this.aiService.transcribeVideo(filePath);

      // Update status
      await this.updateVideoStatus(videoId, 'processing', 50, 'Transcription completed, generating questions...');

      // Save transcript
      video.transcript = transcriptionResult.text;
      
      // Create 5-minute segments
      const segments = this.createSegments(transcriptionResult);
      
      // Generate questions for each segment
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const progress = 50 + ((i + 1) / segments.length) * 40;
        
        await this.updateVideoStatus(
          videoId, 
          'processing', 
          progress, 
          `Generating questions for segment ${i + 1}/${segments.length}...`
        );

        try {
          const questions = await this.aiService.generateQuestions(
            segment.text,
            i + 1,
            segments.length
          );

          segment.questions = questions.map(q => ({
            id: uuidv4(),
            question: q.question,
            options: q.options,
            correctAnswer: q.correct_answer,
            difficulty: q.difficulty as 'easy' | 'medium' | 'hard',
            topic: q.topic
          }));
        } catch (error) {
          console.error(`Error generating questions for segment ${i + 1}:`, error);
          // Continue with empty questions for this segment
          segment.questions = [];
        }
      }

      video.segments = segments;
      await video.save();

      // Mark as completed
      await this.updateVideoStatus(videoId, 'completed', 100, 'Processing completed successfully!');
      console.log(videoId,"this is from videoServices which completes the process");
    } catch (error: any) {
      console.error('Video processing error:', error);
      await this.updateVideoStatus(videoId, 'error', 0, `Error: ${error.message}`);
    }
  }

  private createSegments(transcriptionResult: TranscriptionResult): ISegment[] {
    const segments: ISegment[] = [];
    const segmentDuration = 5 * 60; // 5 minutes in seconds
    
    let currentSegmentStart = 0;
    let currentSegmentText = '';
    
    for (const segment of transcriptionResult.segments) {
      const segmentStart = Math.floor(segment.start);
      const segmentEnd = Math.floor(segment.end);
      
      // If this segment would exceed our 5-minute window, create a new segment
      if (segmentStart >= currentSegmentStart + segmentDuration) {
        if (currentSegmentText.trim()) {
          segments.push({
            id: uuidv4(),
            startTime: currentSegmentStart,
            endTime: currentSegmentStart + segmentDuration,
            text: currentSegmentText.trim(),
            questions: []
          });
        }
        
        currentSegmentStart = Math.floor(segmentStart / segmentDuration) * segmentDuration;
        currentSegmentText = segment.text;
      } else {
        currentSegmentText += ' ' + segment.text;
      }
    }
    
    // Add the last segment
    if (currentSegmentText.trim()) {
      segments.push({
        id: uuidv4(),
        startTime: currentSegmentStart,
        endTime: currentSegmentStart + segmentDuration,
        text: currentSegmentText.trim(),
        questions: []
      });
    }
    
    return segments;
  }

  private async updateVideoStatus(
    videoId: string, 
    status: IVideo['status'], 
    progress: number, 
    currentStep: string
  ): Promise<void> {
    await Video.updateOne(
      { id: videoId },
      { 
        status, 
        progress, 
        currentStep,
        ...(status === 'error' && { errorMessage: currentStep })
      }
    );
  }
}