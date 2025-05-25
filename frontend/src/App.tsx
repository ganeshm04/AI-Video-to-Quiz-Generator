import { VideoProcessor } from './components/VideoProcessor';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './index.css';
import ProcessedVideo from './components/ProcessedVideo';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserProfileAndVideos } from './services/api';
import WelcomeScreen from './components/WelcomeScreen';

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 2,
//       staleTime: 5 * 60 * 1000, // 5 minutes
//       gcTime: 10 * 60 * 1000, // 10 minutes
//     },
//   },
// });

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
  const [videoId, setVideoId] = useState<string>('ddae44ae-7dd1-4cf6-80b5-e6b701819be3');
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const { user, videos } = useUserProfileAndVideos(isAuthenticated);

  const fetchVideoData = async (videoId: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/videos/${videoId}`);

      if (!response.data) {
        throw new Error('Failed to fetch video data');
      }

      const data: VideoData = response.data;
      // console.log(data);

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setVideoData(null);
  };

  const handleVideoSelect = (videoId: string) => {
    setVideoId(videoId);
  };

  // Show welcome screen if not authenticated
  if (!isAuthenticated) {
    return <WelcomeScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <Header
          onVideoSelect={handleVideoSelect}
          onLogout={handleLogout}
          user={user}
          videos={videos}
        />
        <main className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
          {!videoData ? (
            <VideoProcessor setVideoId={setVideoId} />
          ) : (
            <div className="space-y-4">
              <button
                className="w-full md:w-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                onClick={() => setVideoData(null)}
              >
                Upload New Video
              </button>
              <ProcessedVideo videoData={videoData} loading={loading} error={error} />
            </div>
          )}
        </main>
        <Footer />
      </div>

  );
}

export default App;