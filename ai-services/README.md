# AI Services for Video Quiz Generator

## Overview
This service provides AI-powered video processing capabilities for the Video Quiz Generator application. It handles video transcription and automated quiz question generation using state-of-the-art AI models.

## Features
- 🎯 Automated video transcription using OpenAI's Whisper [Local machine]
- 🤖 Intelligent quiz generation using Ollama LLM [Local machine]
- ⚡ Fast API-based service architecture
- 📝 Transcribe video with 90% accuracy
- 🔄 Real-time processing status updates
- 🎯 Multi-difficulty question generation
- 📊 Topic-based question categorization

## Technology Stack
- **FastAPI**: Modern, fast web framework for building APIs
- **Whisper**: OpenAI's speech recognition model [Local machine]
- **Ollama**: Local LLM for question generation
- **PyTorch**: Deep learning framework
- **Python 3.9+**: Core programming language

## Prerequisites
- Python 3.9 or higher
- CUDA-compatible GPU (recommended for faster processing)
- [Ollama](https://ollama.ai/) installed locally

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # Unix
.\venv\Scripts\activate   # Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Environment Variables:
Create a `.env` file with:
```env
WHISPER_MODEL=base        # Options: tiny, base, small, medium, large
LLM_MODEL=mistral:7b      # Default LLM model
```

## Project Structure
```
ai-services/
├── main.py              # Main FastAPI application
├── utils.py             # Utility functions
└── requirements.txt     # Project dependencies
```

## API Endpoints

### 1. Health Check
```http
GET /health
```
Returns the status of AI services and models.

### 2. Video Transcription
```http
POST /transcribe
```
Transcribes video files into text with timestamps.

### 3. Question Generation
```http
POST /generate-questions
```
Generates quiz questions from transcribed text.

## Core Components

### 1. Transcription Service
- Uses OpenAI's Whisper model
- Supports multiple languages
- Provides timestamped segments
- Handles various video formats

### 2. Question Generation Service
- Intelligent question creation using LLM
- Multiple difficulty levels (easy, medium, hard)
- Topic categorization
- Answer validation

### 3. Utility Functions
- Model validation
- Temporary file management
- Logging configuration
- Error handling

## Dependencies
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
python-multipart==0.0.6
torch==2.1.1
transformers==4.35.2
openai-whisper==20231117
ollama==0.1.7
python-dotenv==1.0.0
```

## Running the Service

1. Start the service:
```bash
python main.py
```

2. Access the API documentation:
```
http://localhost:8000/docs
```

## Performance Considerations
- GPU acceleration recommended for Whisper transcription
- Batch processing for efficient question generation
- Automatic cleanup of temporary files
- Resource monitoring and management

## Error Handling
- Comprehensive error logging
- Graceful failure recovery
- Input validation
- Model availability checks

## Security
- CORS middleware configuration
- Input sanitization
- File size limitations
- Temporary file cleanup

## Development Tips
1. Use the development server with auto-reload:
```bash
uvicorn main:app --reload --port 8000
```

2. Monitor logs for debugging:
```bash
tail -f ai-services.log
```

3. Test endpoints using provided Swagger UI:
```
http://localhost:8000/docs
```

## Contributing
1. Follow PEP 8 style guide
2. Add tests for new features
3. Update documentation
4. Use meaningful commit messages

## Troubleshooting
- Check model availability using utility functions
- Verify environment variables
- Monitor system resources
- Check log files for detailed error messages
