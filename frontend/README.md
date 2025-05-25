# Frontend for Video Quiz Generator

## Overview
A modern, responsive web application for the Video Quiz Generator built with React, TypeScript, and Tailwind CSS. This application provides an intuitive interface for uploading videos, managing content, and accessing AI-generated quizzes.

## Features
- 🎨 Modern, responsive UI with Tailwind CSS
- 🔐 Secure user authentication flow
- 📤 Drag-and-drop video uploads
- 📊 Real-time processing status
- 📝 Interactive quiz interface
- 🎯 Multiple quiz difficulty levels
- 💾 JSON/TXT export options
- 📱 Mobile-first design approach

## Technology Stack
- **React 19**: UI framework with SWC for Fast Refresh
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Utility-first CSS
- **TanStack Query**: Data fetching
- **Axios**: HTTP client
- **Lucide React**: Modern icons

## Prerequisites
- Node.js 18+ installed
- Backend service running (port 5000)
- AI service running (port 8000)
- Modern web browser

## Getting Started

1. Install dependencies:
```powershell
npm install
```

2. Environment Setup:
Create a `.env` file:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Project Structure
```
frontend/
├── src/
│   ├── components/           # React components
│   │   ├── Header.tsx       # App header
│   │   ├── Footer.tsx       # App footer
│   │   ├── Login.tsx        # Authentication
│   │   ├── Register.tsx     # User registration
│   │   ├── Profile.tsx      # User profile
│   │   ├── VideoProcessor.tsx    # Video upload
│   │   ├── ProcessedVideo.tsx    # Quiz view
│   │   ├── ProcessingStatus.tsx  # Status
│   │   ├── VideoUpload.tsx       # Upload UI
│   │   └── WelcomeScreen.tsx     # Landing page
│   ├── services/            # API services
│   ├── types/              # TypeScript definitions
│   ├── App.tsx             # Root component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── package.json
└── vite.config.ts
```

## Core Components

### 1. Authentication Flow
- User registration with validation
- Secure login management
- JWT token handling
- Protected routes
- Profile management

### 2. Video Management
- Drag-and-drop upload interface
- Progress tracking with real-time updates
- File validation and type checking
- Processing status monitoring

### 3. Quiz Interface
- Interactive question display
- Multiple choice options
- Difficulty indicators with color coding
- Topic-based organization
- Export to JSON/TXT formats

## Running the Application

1. Development mode:
```powershell
npm run dev
```

2. Production build:
```powershell
npm run build
npm run preview
```

## State Management
- React Query for server state
- Local state with useState
- Error boundaries for stability
- Loading state management
- Form validation states

## Performance Optimization
- React.memo for expensive components
- Lazy loading for routes
- Image and video optimization
- Bundle size management
- Code splitting

## Development Tools
- ESLint with TypeScript integration
- Prettier for code formatting
- TypeScript strict mode
- Hot module replacement
- Chrome DevTools

## Best Practices
- Component composition patterns
- Custom hooks for reusability
- Strong TypeScript typing
- Comprehensive error handling
- Proper loading states
- Form validation

## Contributing
1. Follow React best practices
2. Use TypeScript strictly
3. Write component tests
4. Document props and functions

## Troubleshooting
- Check API connectivity
- Verify environment variables
- Clear browser cache
- Check console errors
- Review network requests

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers
