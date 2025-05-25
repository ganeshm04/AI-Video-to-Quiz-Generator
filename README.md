# AI Video Quiz Generator

## Project Overview
An innovative full-stack application that automatically generates interactive quizzes from video lectures using AI. The system transcribes videos, analyzes content, and creates intelligent multiple-choice questions, making learning assessment efficient and engaging.

## 🌟 Key Features
- 🎥 Video lecture upload and processing
- 🤖 AI-powered transcription using OpenAI's Whisper [local machine]
- 📝 Intelligent quiz generation using Local LLM (Mistral-7B)
- 🎯 Multiple difficulty levels (easy, medium, hard)
- 📊 Topic-based question categorization
- 🔄 Real-time processing status updates
- 📱 Responsive design for all devices
- 🔐 Secure user authentication
- 💾 Export quizzes in multiple formats

## 🏗 Architecture
The project is structured into three main components:

### 1. Frontend (React + TypeScript)
- Modern UI built with React 19
- Type-safe development with TypeScript
- Responsive design with Tailwind CSS
- Real-time updates with TanStack Query
- Component-based architecture

### 2. Backend (Node.js + Express)
- RESTful API architecture
- JWT authentication
- MongoDB integration
- File upload handling
- Video processing queue

### 3. AI Services (Python + FastAPI)
- Video transcription with Whisper
- Question generation with Mistral-7B
- Asynchronous processing
- Error recovery
- Batch processing

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB 6+
- [Ollama](https://ollama.ai/) for local LLM
- Whisper
- CUDA-compatible GPU (recommended)

### Installation

1. Clone the repository:
```powershell
git clone https://github.com/ganeshm04/AI-Video-to-Quiz-Generator.git
cd ai_video_quiz_gen
```

2. Frontend Setup:
```powershell
cd frontend
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```

3. Backend Setup:
```powershell
cd backend
npm install
cp .env.example .env
# Update .env with your configuration
npm run dev
```

4. AI Services Setup:
```powershell
cd ai-services
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Update .env with your configuration
python main.py
```

## 🔧 Configuration

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/video_quiz_gen
JWT_SECRET=your_jwt_secret_here
FRONTEND_URL=http://localhost:3000
AI_SERVICE_URL=http://localhost:8000
```

### AI Services (.env)
```env
WHISPER_MODEL=base
LLM_MODEL=mistral:7b
```

## 📚 Project Structure
```
ai_video_quiz_gen/
├── frontend/          # React frontend application
├── backend/          # Express backend server
└── ai-services/      # Python AI services
```

## 🔍 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Video Endpoints
- `POST /api/videos/upload` - Upload video
- `GET /api/videos/my` - List user's videos
- `GET /api/videos/:id` - Get video details

### AI Service Endpoints
- `POST /transcribe` - Transcribe video
- `POST /generate-questions` - Generate quiz questions
- `GET /health` - Service health check

## 🛡 Security Features
- JWT authentication
- Password hashing
- File validation
- Rate limiting
- CORS protection
- Input sanitization

## 💻 Development

### Running in Development Mode
1. Start all services:
```powershell
# Terminal 1 - Frontend
cd frontend
npm run dev

# Terminal 2 - Backend
cd backend
npm run dev

# Terminal 3 - AI Services
cd ai-services
python main.py
```

2. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- AI Services: http://localhost:8000

### Testing
Each component includes its own test suite:
```powershell
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test

# AI Services tests
cd ai-services
pytest
```

## 🚀 Production Deployment
1. Build frontend:
```powershell
cd frontend
npm run build
```

2. Build backend:
```powershell
cd backend
npm run build
```

3. Configure environment variables for production
4. Set up NGINX or similar reverse proxy
5. Configure SSL/TLS
6. Set up PM2 or similar process manager

## 🔧 Troubleshooting
1. **Video Processing Issues**
   - Check GPU availability
   - Verify file permissions
   - Monitor memory usage

2. **AI Service Issues**
   - Verify Ollama installation
   - Check model availability
   - Monitor CUDA status

3. **Backend Issues**
   - Check MongoDB connection
   - Verify JWT configuration
   - Check file permissions

## 📝 Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


## 🙏 Acknowledgments
- OpenAI Whisper for transcription
- Mistral AI for LLM model
- Ollama for local AI deployment
- React and TypeScript communities
- MongoDB and Express.js teams

## 📞 Support
For support, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue if needed

## 🛣 Roadmap
- [ ] Multi-language support
- [ ] Additional quiz formats
- [ ] Enhanced analytics
- [ ] Batch processing
- [ ] API rate limiting
- [ ] Advanced caching
