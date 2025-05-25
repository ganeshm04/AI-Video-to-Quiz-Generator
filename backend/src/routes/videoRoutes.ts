import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import Video from '../models/Video';
import { VideoService } from '../services/videoService';
import { authenticateJWT, AuthRequest } from '../middleware/auth';
import User from '../models/User';

const router = Router();
const videoService = new VideoService();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'video-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '2147483648') // 2GB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
      cb(null, true);
    } else {
      cb(new Error('Only MP4 files are allowed'));
    }
  }
});

// Upload video (authenticated)
router.post('/upload', authenticateJWT, upload.single('video'), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }
    const videoId = uuidv4();
    const video = new Video({
      id: videoId,
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      status: 'uploaded',
      progress: 0,
      currentStep: 'uploaded',
      uploadDate: new Date(),
      segments: [],
    });
    await video.save();

    // Associate video with user
    await User.findByIdAndUpdate(req.user.id, { $push: { videos: videoId } });

    // Start processing in background
   await videoService.processVideo(videoId).catch(console.error);
  //  console.log("Video uploaded successfully", videoId,"fuuly completed and saved to db and Processesed from /upload route");

   
    res.status(201).json({
      id: videoId,
      message: 'Video uploaded successfully',
      filename: req.file.filename
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Get all videos uploaded by the authenticated user
router.get('/my', authenticateJWT, async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const videosId = await Video.find({ id: { $in: user.videos } });

    const videoNames = videosId.map(video => ({
      id: video.id,
      originalName: video.originalName
    }));
    res.json(videoNames);
    return;
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get video details by ID
router.get('/:id', authenticateJWT,async (req: Request, res: Response): Promise<void> => {
  try {
    const video = await Video.findOne({ id: req.params.id });
    
    if (!video) {
      res.status(404).json({ error: 'Video not found' });
      return;
    }
    // console.log("video details", video);
    res.json(video);
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ error: 'Failed to get video' });
  }
});

// Export quiz data
router.get('/:id/export', authenticateJWT,async (req: Request, res: Response): Promise<void> => {
  try {
    const video = await Video.findOne({ id: req.params.id });
    
    if (!video) {
      res.status(404).json({ error: 'Video not found' });
      return;
    }

    const format = req.query.format as string || 'json';
    
    if (format === 'json') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename=quiz-${video.id}.json`);
      res.json({
        videoInfo: {
          id: video.id,
          originalName: video.originalName,
          duration: video.duration
        },
        segments: video.segments.map(segment => ({
         
          startTime: segment.startTime,
          endTime: segment.endTime,
          text: segment.text,
          questions: segment.questions.map(question => ({
            question: question.question,
            options: question.options,
            correctAnswer: question.correctAnswer,
            difficulty: question.difficulty,
            topic: question.topic,
          })),
        })),
      });
    } else if (format === 'csv') {
      // Convert to CSV format
      let csvContent = 'Segment,Start Time,End Time,Question,Option A,Option B,Option C,Option D,Correct Answer,Difficulty,Topic\n';
      
      video.segments.forEach((segment, segIndex) => {
        segment.questions.forEach(question => {
          csvContent += `${segIndex + 1},${segment.startTime},${segment.endTime},"${question.question}","${question.options[0]}","${question.options[1]}","${question.options[2]}","${question.options[3]}",${question.correctAnswer + 1},${question.difficulty},"${question.topic || ''}"\n`;
        });
      });
      
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=quiz-${video.id}.csv`);
      res.send(csvContent);
    } else {
      res.status(400).json({ error: 'Unsupported format' });
    }
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Export failed' });
  }
});

// Get all videos
router.get('/', authenticateJWT,async (req: Request, res: Response): Promise<void> => {
  try {
    const videos = await Video.find({}).sort({ uploadDate: -1 }).limit(10);
    res.json(videos);
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ error: 'Failed to get videos' });
  }
});

export default router;