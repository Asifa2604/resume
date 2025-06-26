from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
from typing import Dict, Any

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for resumes
RESUME_FILE = "resume_data.json"

class SectionEnhancementRequest(BaseModel):
    section: str
    content: str

class ResumeData(BaseModel):
    data: Dict[str, Any]

def load_resumes():
    if not os.path.exists(RESUME_FILE):
        return {}
    with open(RESUME_FILE, "r") as f:
        return json.load(f)

def save_resumes(resumes):
    with open(RESUME_FILE, "w") as f:
        json.dump(resumes, f)

@app.post("/ai-enhance")
async def enhance_section(request: SectionEnhancementRequest):
    # Mock AI enhancement
    enhanced_content = f"[AI-Enhanced] {request.content} (Improved with simulated AI)"
    return {"enhanced_content": enhanced_content}

@app.post("/save-resume")
async def save_resume(resume: ResumeData):
    resumes = load_resumes()
    # Using a simple key - in a real app you'd want user auth
    resumes["current"] = resume.data
    save_resumes(resumes)
    return {"message": "Resume saved successfully"}

@app.get("/get-resume")
async def get_resume():
    resumes = load_resumes()
    return resumes.get("current", {})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)