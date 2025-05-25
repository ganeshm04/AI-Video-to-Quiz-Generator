// frontend/src/components/Header.tsx
import React from 'react';
import { Video, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg">
              <Video className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Video Quiz Generator
              </h1>
              <p className="text-sm text-gray-600">
                Transform lectures into interactive quizzes with AI
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Zap className="w-4 h-4" />
            <span>Powered by Local AI</span>
          </div>
        </div>
      </div>
    </header>
  );
};