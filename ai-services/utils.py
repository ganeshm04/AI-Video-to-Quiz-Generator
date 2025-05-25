import os
import logging
from typing import Optional

def setup_logging():
    """Setup logging configuration"""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    return logging.getLogger(__name__)

def validate_model_availability():
    """Check if required models are available"""
    try:
        import ollama
        models = ollama.list()
        available_models = [model['name'] for model in models['models']]
        
        required_model = os.getenv("LLM_MODEL", "mistral:7b")
        
        if required_model not in available_models:
            print(f"❌ Required model {required_model} not found")
            print(f"📥 Available models: {available_models}")
            return False
        
        print(f"✅ Model {required_model} is available")
        return True
        
    except Exception as e:
        print(f"❌ Error checking models: {e}")
        return False

def cleanup_temp_files(temp_dir: str = "/tmp"):
    """Clean up temporary files"""
    import glob
    temp_files = glob.glob(f"{temp_dir}/tmp*")
    for file in temp_files:
        try:
            os.unlink(file)
        except:
            pass