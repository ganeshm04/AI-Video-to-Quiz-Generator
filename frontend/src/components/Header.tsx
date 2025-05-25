// frontend/src/components/Header.tsx
import React, { useState } from 'react';
import {  ChevronDown, Menu } from 'lucide-react';

interface HeaderUploadsProps {
  onVideoSelect: (videoId: string) => void;
  onLogout: () => void;
  user: { name: string; email: string } | null;
  videos: { id: string; originalName: string }[];
}

const HeaderUploads: React.FC<HeaderUploadsProps> = ({ onVideoSelect, onLogout, user, videos }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center space-x-2 md:space-x-4 relative">
      {user && (
        <>
          <div className="hidden md:block text-right">
            <div className="font-semibold text-gray-800 text-sm md:text-base">{user.name}</div>
            <div className="text-xs md:text-sm text-gray-500">{user.email}</div>
          </div>
          <div className="relative">
            <button
              className="px-2 py-1 md:px-3 md:py-1 bg-gray-700 text-white rounded text-xs md:text-sm flex items-center"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="hidden md:inline">Uploads</span>
              <span className="md:hidden">Files</span>
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-48 md:w-64 bg-white border rounded shadow-lg z-50">
                {videos.length === 0 && (
                  <div className="px-4 py-2 text-gray-500 text-xs md:text-sm">No uploads</div>
                )}
                {videos.map((v) => (
                  <button
                    key={v.id}
                    className="w-full text-left px-4 py-2 hover:bg-blue-100 text-xs md:text-sm truncate"
                    onClick={() => { setOpen(false); onVideoSelect(v.id); }}
                  >
                    {v.originalName}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button 
            className="px-2 py-1 md:px-3 md:py-1 bg-red-500 text-white rounded text-xs md:text-sm" 
            onClick={onLogout}
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export const Header: React.FC<{
  onVideoSelect?: (videoId: string) => void;
  onLogout?: () => void;
  user?: { name: string; email: string } | null;
  videos?: { id: string; originalName: string }[];
}> = ({ onVideoSelect, onLogout, user, videos }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-200 shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg">
              {/* <Video className="w-5 h-5 md:w-6 md:h-6 text-white" /> */}
              <img src="..\..\public\Aivid2Quiz.png" alt=""/>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                Video Quiz Generator
              </h1>
              <p className="text-xs md:text-sm text-gray-600 hidden md:block">
                Transform lectures into interactive quizzes with AI
              </p>
            </div>
          </div>

          {/* <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
            
          </div> */}

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Desktop menu */}
          <div className="hidden md:block">
            <HeaderUploads
              onVideoSelect={onVideoSelect || (() => {})}
              onLogout={onLogout || (() => {})}
              user={user || null}
              videos={videos || []}
            />
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {user && (
              <div className="mb-4">
                <div className="font-semibold text-gray-800">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            )}
            <HeaderUploads
              onVideoSelect={onVideoSelect || (() => {})}
              onLogout={onLogout || (() => {})}
              user={user || null}
              videos={videos || []}
            />
          </div>
        )}
      </div>
    </header>
  );
};