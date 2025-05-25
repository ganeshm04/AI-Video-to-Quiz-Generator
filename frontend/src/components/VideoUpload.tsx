// frontend/src/components/VideoUpload.tsx
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Video, AlertCircle, FileVideo, Info } from 'lucide-react';

interface VideoUploadProps {
  onUpload: (file: File) => void;
  isUploading: boolean;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload, isUploading }) => {
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      // Validate file size (2GB limit)
      if (file.size > 2 * 1024 * 1024 * 1024) {
        setError('File size must be less than 2GB');
        return;
      }
      
      // Validate file type
      if (!file.type.includes('mp4')) {
        setError('Only MP4 files are supported');
        return;
      }
      
      setError('');
      onUpload(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/mp4': ['.mp4']
    },
    multiple: false,
    disabled: isUploading
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="card p-8">
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
            ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className="flex flex-col items-center space-y-6">
            {isUploading ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
                <p className="text-lg font-medium text-blue-600">Uploading video...</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full">
                  <FileVideo className="h-10 w-10 text-gray-400" />
                </div>
                
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-gray-900">
                    Upload Your Lecture Video
                  </p>
                  <p className="text-gray-600">
                    Drag and drop an MP4 file here, or click to browse
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* File requirements */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-700">
              <p className="font-medium mb-2">File Requirements:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Format: MP4 only</li>
                <li>Maximum size: 2GB</li>
                <li>Recommended: Clear audio quality for better transcription</li>
                <li>Language: English (primary support)</li>
              </ul>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-4 rounded-md bg-red-50 border border-red-200">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};