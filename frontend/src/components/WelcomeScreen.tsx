import React, { useState } from 'react';
import { Video } from 'lucide-react';
import Login from './Login';
import Register from './Register';

interface WelcomeScreenProps {
  onLogin: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onLogin }) => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Welcome Content */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-12 flex flex-col justify-between text-white">
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-lg">
              <Video className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold">AI Video to Quiz Generator</h1>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">Create Account</h2>
          <p className="text-gray-400 mb-6 md:mb-8">Get Started with your free account</p>
        </div>
        <div className="hidden md:block">
          <p className="text-sm text-gray-400">
            Enhance your learning experience with our AI-powered video quiz generator. Create engaging quizzes from your videos in minutes, and track your progress effortlessly.
          </p>
        </div>
      </div>

      {/* Right Side - Auth Forms */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex items-center justify-center">
        <div className="w-full max-w-md px-4 md:px-0">
          {showRegister ? (
            <Register onRegister={() => setShowRegister(false)} />
          ) : (
            <Login onLogin={onLogin} />
          )}
          <div className="mt-6 text-center">
            {showRegister ? (
              <p className="text-gray-600 text-sm md:text-base">
                Already have an account?{' '}
                <button
                  onClick={() => setShowRegister(false)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Sign in
                </button>
              </p>
            ) : (
              <p className="text-gray-600 text-sm md:text-base">
                Don't have an account?{' '}
                <button
                  onClick={() => setShowRegister(true)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Create Account
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
