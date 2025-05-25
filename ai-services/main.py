# ai-services/main.py
import os
import tempfile
import json
import asyncio
from typing import List, Dict, Optional
from pathlib import Path

import whisper
import ollama
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(
    title="AI Services for Video Quiz Generator",
    description="Transcription and Question Generation Services",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for models
whisper_model = None
llm_model_name = os.getenv("LLM_MODEL", "mistral:7b")

# Pydantic models
class TranscriptionResponse(BaseModel):
    text: str
    segments: List[Dict]
    language: str

class QuestionGenerationRequest(BaseModel):
    text: str
    segment_number: int
    total_segments: int

class Question(BaseModel):
    question: str
    options: List[str]
    correct_answer: int
    difficulty: str
    topic: str

class QuestionGenerationResponse(BaseModel):
    questions: List[Question]

class HealthResponse(BaseModel):
    status: str
    models: Dict[str, str]
    message: str

# Startup event
@app.on_event("startup")
async def startup_event():
    global whisper_model
    
    print("🚀 Starting AI Services...")
    
    # Load Whisper model
    try:
        model_size = os.getenv("WHISPER_MODEL", "base")
        print(f"📝 Loading Whisper model: {model_size}")
        whisper_model = whisper.load_model(model_size)
        print("✅ Whisper model loaded successfully")
    except Exception as e:
        print(f"❌ Failed to load Whisper model: {e}")
        raise
    
    # Check Ollama connection
    try:
        print(f"🤖 Checking LLM model: {llm_model_name}")
        models = ollama.list()
        model_names = [model['model'] for model in models['models']]
        
        if llm_model_name not in model_names:
            print(f"📥 Pulling model {llm_model_name}...")
            ollama.pull(llm_model_name)
        
        print("✅ LLM model ready")
    except Exception as e:
        print(f"❌ Failed to initialize LLM: {e}")
        raise

# Health check endpoint
@app.get("/health", response_model=HealthResponse)
async def health_check():
    try:
        # Check Whisper
        whisper_status = "loaded" if whisper_model is not None else "not_loaded"
        
        # Check Ollama
        try:
            ollama.list()
            llm_status = "connected"
        except:
            llm_status = "disconnected"
        
        overall_status = "healthy" if whisper_status == "loaded" and llm_status == "connected" else "unhealthy"
        
        return HealthResponse(
            status=overall_status,
            models={
                "whisper": whisper_status,
                "llm": llm_status
            },
            message="AI services are running"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Health check failed: {str(e)}")

# Transcription endpoint
@app.post("/transcribe", response_model=TranscriptionResponse)
async def transcribe_audio(
    file: UploadFile = File(...),
    language: Optional[str] = None,
    task: str = "transcribe"
):
    if not file.filename.lower().endswith(('.mp4', '.wav', '.mp3', '.m4a', '.avi', '.mov')):
        raise HTTPException(status_code=400, detail="Unsupported file format")
    
    if whisper_model is None:
        raise HTTPException(status_code=500, detail="Whisper model not loaded")
    
    if task not in ["transcribe", "translate"]:
        raise HTTPException(status_code=400, detail="Task must be either 'transcribe' or 'translate'")
    
    try:
        print(f"📝 Starting transcription for: {file.filename}")
        
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=Path(file.filename).suffix) as tmp_file:
            content = await file.read()
            tmp_file.write(content)
            tmp_file_path = tmp_file.name
        
        print(f"💾 Temporary file saved: {tmp_file_path}")
        
        # Transcribe using Whisper with advanced features
        print("🎯 Processing with Whisper...")
        result = whisper_model.transcribe(
            tmp_file_path,
            # Basic parameters
            temperature=(0.0, 0.2, 0.4, 0.6, 0.8, 1.0),  # Temperature fallback for better quality
            best_of=5,  # Sample multiple times and pick best
            beam_size=5,  # Use beam search for better accuracy
            word_timestamps=True,  # Get word-level timing
            
            # Advanced parameters
            task=task,  # transcribe or translate
            language=language,  # None for auto-detect
            condition_on_previous_text=True,  # Use previous context
            compression_ratio_threshold=2.4,  # Threshold for temperature fallback
            logprob_threshold=-1.0,  # Threshold for temperature fallback
            no_speech_threshold=0.6,  # Threshold for detecting silence
        )
        
        # Clean up temporary file
        os.unlink(tmp_file_path)
        print("🗑️ Temporary file cleaned up")
        
        print(f"✅ Transcription completed. Language: {result['language']}")
        
        return TranscriptionResponse(
            text=result["text"],
            segments=result["segments"],
            language=result["language"]
        )
    
    except Exception as e:
        # Clean up temporary file in case of error
        if 'tmp_file_path' in locals() and os.path.exists(tmp_file_path):
            os.unlink(tmp_file_path)
        
        print(f"❌ Transcription error: {e}")
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")

# Question generation endpoint
@app.post("/generate-questions", response_model=QuestionGenerationResponse)
async def generate_questions(request: QuestionGenerationRequest):
    try:
        print(f"🤖 Generating questions for segment {request.segment_number}/{request.total_segments}")
        
        # Prepare prompt for LLM
        prompt = f"""You are an educational assessment expert. Based on the following educational content, generate 3-4 high-quality multiple choice questions that test comprehension and key concepts.

Content (Segment {request.segment_number} of {request.total_segments}):
{request.text[:2000]}  # Limit text to avoid token limits

Instructions:
1. Create questions that test understanding, not just memorization
2. Include exactly 4 options (A, B, C, D) for each question
3. Vary difficulty levels (easy, medium, hard)
4. Focus on key concepts and important information
5. Make incorrect options plausible but clearly wrong
6. Identify the main topic for each question

You must respond with valid JSON in this exact format:
{{
  "questions": [
    {{
      "question": "What is the main concept discussed about [topic]?",
      "options": ["Correct answer", "Plausible wrong answer", "Another wrong answer", "Final wrong answer"],
      "correct_answer": 0,
      "difficulty": "medium",
      "topic": "Main topic"
    }}
  ]
}}

Generate 4-5 questions now:"""

        # Use Ollama to generate questions
        print(f"🔄 Calling LLM model: {llm_model_name}")
        response = ollama.chat(model=llm_model_name, messages=[
            {
                'role': 'system',
                'content': 'You are an expert educational assessment creator. Always respond with valid JSON only.'
            },
            {
                'role': 'user',
                'content': prompt
            }
        ])
        
        response_text = response['message']['content']
        print(f"📤 LLM Response length: {len(response_text)} characters")
        
        # Extract and parse JSON from response
        try:
            # Find JSON block in response
            json_start = response_text.find('{')
            json_end = response_text.rfind('}') + 1
            
            if json_start == -1 or json_end == 0:
                raise ValueError("No JSON found in response")
            
            json_str = response_text[json_start:json_end]
            questions_data = json.loads(json_str)
            
            # Validate structure
            if 'questions' not in questions_data:
                raise ValueError("Invalid JSON structure")
            
            # Validate each question
            validated_questions = []
            for q in questions_data['questions']:
                if all(key in q for key in ['question', 'options', 'correct_answer', 'difficulty', 'topic']):
                    if len(q['options']) == 4 and 0 <= q['correct_answer'] <= 3:
                        validated_questions.append(Question(**q))
            
            if not validated_questions:
                raise ValueError("No valid questions found")
            
            print(f"✅ Generated {len(validated_questions)} valid questions")
            return QuestionGenerationResponse(questions=validated_questions)
            
        except (json.JSONDecodeError, ValueError, KeyError) as e:
            print(f"⚠️ JSON parsing failed: {e}, creating fallback question")
            
            # Create a fallback question based on the content
            content_preview = request.text[:200] + "..." if len(request.text) > 200 else request.text
            
            fallback_question = Question(
                question=f"Based on the content in segment {request.segment_number}, what is the main topic being discussed?",
                options=[
                    "The primary concept explained in this segment",
                    "A secondary topic mentioned briefly",
                    "An unrelated educational topic",
                    "Background information only"
                ],
                correct_answer=0,
                difficulty="medium",
                topic="Content Comprehension"
            )
            
            return QuestionGenerationResponse(questions=[fallback_question])
    
    except Exception as e:
        print(f"❌ Question generation error: {e}")
        raise HTTPException(status_code=500, detail=f"Question generation failed: {str(e)}")

# Test endpoint for debugging
@app.post("/test-llm")
async def test_llm():
    try:
        response = ollama.chat(model=llm_model_name, messages=[
            {
                'role': 'user',
                'content': 'Hello, are you working?'
            }
        ])
        return {"status": "success", "response": response['message']['content']}
    except Exception as e:
        return {"status": "error", "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", 8000))
    log_level = os.getenv("LOG_LEVEL", "info")
    
    print(f"🌐 Starting server on {host}:{port}")
    uvicorn.run(app, host=host, port=port, log_level=log_level)