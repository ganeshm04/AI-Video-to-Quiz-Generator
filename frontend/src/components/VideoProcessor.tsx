import React, { useState, useRef } from 'react'; // <-- Added useRef import
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

interface VideoProcessorProps {
  onUploadComplete?: (videoId: string) => void;
  setVideoId: React.Dispatch<React.SetStateAction<string>>;
}

export const VideoProcessor: React.FC<VideoProcessorProps> = ({ onUploadComplete, setVideoId }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusText, setStatusText] = useState<string>('Ready to upload');

  // Define the sequence of status messages
  const processingSteps = [
    'Uploading video',
    'Processing video',
    'Transcribing video',
    'Generating Quiz'
  ];

  // Use useRef to persist interval across renders
  const stepInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.type !== 'video/mp4') {
      setError('Only MP4 files are allowed');
      return;
    }

    if (file.size > 2 * 1024 * 1024 * 1024) { // 2GB
      setError('File size must be less than 2GB');
      return;
    }

    setUploading(true);
    setError(null);
    setStatusText('Uploading video'); // Set initial status text

    // Start cycling through status messages
    let currentStepIndex = 0;
    if (stepInterval.current) clearInterval(stepInterval.current);
    stepInterval.current = setInterval(() => {
      currentStepIndex = (currentStepIndex + 1) % processingSteps.length;
      setStatusText(processingSteps[currentStepIndex]);
    }, 3000); // Change message every 3 seconds

    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/videos/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setStatusText(`Uploading video: ${percentCompleted}%`);
        },
      });

      if (response.data.id) {
        setVideoId(response.data.id);
        onUploadComplete?.(response.data.id);
        console.log(response.data.id);
        setStatusText('Processing completed'); // Final status
      }
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error('Upload error:', err);
      setStatusText('Upload failed'); // Error status
    } finally {
      setUploading(false);
      if (stepInterval.current) {
        clearInterval(stepInterval.current);
        stepInterval.current = null;
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4']
    },
    maxFiles: 1,
    disabled: uploading
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-500' : 'border-gray-300 hover:border-blue-400'}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="space-y-4 flex flex-col items-center">
            {/* Spinning Animation */}
            <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent border-solid rounded-full animate-spin"></div>
            {/* Status Text */}
            <p className="text-gray-900">{statusText}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-gray-600">
              {isDragActive ? (
                <p>Drop the video here...</p>
              ) : (
                <p>
                  Drag and drop your MP4 video here, or{' '}
                  <span className="text-blue-500">click to select</span>
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Maximum file size: 2GB
              </p>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      )}
    </div>
  );
};