import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { VideoProcessor } from './components/VideoProcessor';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './index.css';
import ProcessedVideo from './components/ProcessedVideo';
import { useEffect, useState } from 'react';
import axios from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Type definitions
interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
}

interface Segment {
  id: string;
  startTime: number;
  endTime: number;
  text: string;
  questions: Question[];
}

interface VideoData {
  _id: string;
  id: string;
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  status: string;
  progress: number;
  currentStep: string;
  uploadDate: string;
  transcript: string;
  segments: Segment[];
  createdAt: string;
  updatedAt: string;
  duration: number;
}

function App() {
  const [videoId, setVideoId] = useState<string>('ddae44ae-7dd1-4cf6-80b5-e6b701819be3'); // Default ID
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVideoData = async (videoId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos/${videoId}`);

      if (!response.data) {
        throw new Error('Failed to fetch video data');
      }

      const data: VideoData = response.data;
      console.log(data);

      setVideoData(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Error fetching video data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    if (videoId) {
      fetchVideoData(videoId);
    }
  }, [videoId]);
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {!videoData ? (
            <>
              <VideoProcessor setVideoId={setVideoId} />
            </>
          ) : (
            <>
            <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => setVideoData(null)}>
                Upload New Video
              </button>
            <ProcessedVideo videoData={videoData} loading={loading} error={error} />
            </>
          )}
        </main>

        <Footer />
      </div>

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;