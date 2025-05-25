# Backend Service for Video Quiz Generator

## Overview
The backend service provides the core server functionality for the Video Quiz Generator application. Built with Express.js and TypeScript, it handles user authentication, video management, and integration with AI services.

## Features
- 🔐 JWT-based authentication system
- 📁 Secure file upload and management
- 🔄 Integration with AI services
- 📊 MongoDB database integration
- 🚦 Rate limiting and security measures
- 🎥 Video processing queue management
- 📝 RESTful API architecture

## Technology Stack
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **TypeScript**: Programming language
- **MongoDB**: Database
- **JWT**: Authentication
- **Multer**: File upload handling
- **Mongoose**: MongoDB object modeling

## Prerequisites
- Node.js 18+ installed
- MongoDB 6+ running locally or accessible URL
- TypeScript understanding
- Access to AI Services (running on port 8000)

## Installation

1. Install dependencies:
```powershell
npm install
```

2. Environment Setup:
Create a `.env` file with:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/video_quiz_gen
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:3000
AI_SERVICE_URL=http://localhost:8000
```

## Project Structure
```
backend/
├── src/
│   ├── app.ts                 # Express app setup
│   ├── server.ts              # Server entry point
│   ├── middleware/
│   │   └── auth.ts           # Authentication middleware
│   ├── models/
│   │   ├── User.ts           # User model
│   │   └── Video.ts          # Video model
│   ├── routes/
│   │   ├── authRoutes.ts     # Authentication routes
│   │   └── videoRoutes.ts    # Video management routes
│   ├── services/
│   │   ├── aiService.ts      # AI integration service
│   │   └── videoService.ts   # Video processing service
│   └── types/                # TypeScript type definitions
├── uploads/                   # Video storage
├── temp/                      # Temporary file storage
├── package.json
└── tsconfig.json
```

## API Endpoints

### Authentication
```http
POST   /api/auth/register     # User registration
POST   /api/auth/login        # User login
GET    /api/auth/profile      # Get user profile
```

### Video Management
```http
POST   /api/videos/upload     # Upload new video
GET    /api/videos/my         # List user's videos
GET    /api/videos/:id        # Get video details
DELETE /api/videos/:id        # Delete video
```

## Core Components

### 1. Authentication Service
- JWT token generation and validation
- Password hashing with bcrypt
- Session management
- User profile management

### 2. Video Management
- Secure file upload handling
- Video metadata storage
- Integration with AI processing
- Progress tracking

### 3. Database Models
- User schema with video references
- Video schema with processing status
- Relationship management
- Data validation

## Dependencies
Key production dependencies:
```json
{
  "express": "^5.1.0",
  "mongoose": "^8.15.0",
  "typescript": "^5.8.3",
  "bcryptjs": "^3.0.2",
  "jsonwebtoken": "^9.0.2",
  "multer": "^2.0.0"
}
```

## Running the Service

1. Development mode:
```powershell
npm run dev
```

2. Production build:
```powershell
npm run build
npm start
```

## Security Features
- Helmet.js for HTTP headers
- CORS configuration
- Rate limiting
- Input validation
- File type checking
- JWT token verification

## Error Handling
- Global error middleware
- Request validation
- Type checking
- Async error catching
- File upload error handling

## Development Tips

1. TypeScript Configuration:
   - Strict mode enabled
   - ESNext target
   - Path aliases configured

2. Debug Configuration:
   - Source maps enabled
   - VS Code launch settings
   - Node.js inspector

3. Testing:
   - Unit tests with Jest
   - API testing with Supertest
   - MongoDB memory server

## Monitoring and Logging
- Morgan for HTTP logging
- Error tracking
- Performance monitoring
- File upload tracking
- Processing status updates

## Performance Optimization
- Compression middleware
- Static file caching
- Database indexing
- Connection pooling
- Streaming file uploads

## Deployment Considerations
- Environment variables
- PM2 process management
- Nginx reverse proxy
- SSL/TLS configuration
- Database backups

## Contributing
1. Follow TypeScript best practices
2. Maintain code documentation
3. Add unit tests
4. Use conventional commits

## Troubleshooting
- Check MongoDB connection
- Verify JWT token configuration
- Monitor file permissions
- Check API service connectivity
- Review error logs
