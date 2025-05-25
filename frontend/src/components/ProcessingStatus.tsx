// frontend/src/components/ProcessingStatus.tsx
import React from 'react';
import { CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';

interface ProcessingStatusProps {
  status: string;
  progress: number;
  currentStep: string;
  fileName?: string;
}

export const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  status,
  progress,
  currentStep,
  fileName
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-8 w-8 text-red-500" />;
      default:
        return <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  const getProgressBarColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  const formatStatus = (status: string) => {
    switch (status) {
      case 'uploaded':
        return 'Uploaded';
      case 'transcribing':
        return 'Transcribing Audio';
      case 'processing':
        return 'Generating Questions';
      case 'completed':
        return 'Completed Successfully';
      case 'error':
        return 'Processing Failed';
      default:
        return 'Processing';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="card p-8">
        <div className="flex items-center justify-center mb-8">
          {getStatusIcon()}
        </div>
        
        <div className="text-center mb-8">
          <h2 className={`text-2xl font-semibold mb-2 ${getStatusColor()}`}>
            {formatStatus(status)}
          </h2>
          
          {fileName && (
            <p className="text-gray-600 mb-4">
              Processing: {fileName}
            </p>
          )}
          
          <p className="text-gray-700">
            {currentStep}
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${getProgressBarColor()}`}
            style={{ width: `${Math.max(progress, 5)}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>{Math.round(progress)}% Complete</span>
          {status === 'processing' && (
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>This may take several minutes...</span>
            </div>
          )}
        </div>
        
        {status === 'error' && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 font-medium">
              Something went wrong during processing. Please try uploading your video again.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};