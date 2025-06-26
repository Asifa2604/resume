# Resume Editor Application

A modern web-based resume editor with AI enhancement capabilities, built with React (Vite) frontend and FastAPI backend.

![Resume Editor Screenshot](\frontend\src\assets)

## Features

- 📄 Upload and parse resumes (PDF/DOCX mock functionality)
- ✏️ Edit all resume sections (personal info, experience, education, skills)
- 🤖 AI-powered content enhancement (simulated)
- 💾 Save resumes to backend
- ⬇️ Download as JSON
- 🎨 Responsive, modern UI with:
  - Tab-based navigation
  - Form validation
  - Loading states
  - Interactive elements

## Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- React Icons

**Backend:**
- Python FastAPI
- Uvicorn server

## Prerequisites

- Node.js v16+
- Python 3.7+
- Git (optional)

## Installation

### 1. Clone the repository
https://github.com/Asifa2604/resume.git

### 2. Set up the backend
cd backend
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt

### 3. Set up the frontend
cd ../frontend
npm install

### Running the Application
Start the backend server
cd backend
python main.py
Server runs at: http://localhost:8000

### Start the frontend development server
cd ../frontend
npm run dev
Frontend runs at: http://localhost:5173

Usage
Upload Resume:

Navigate to "Upload Resume" tab

Select a file (PDF/DOCX mock)

Click "Upload & Parse"

Edit Resume:

All fields are editable

Click "Enhance with AI" for section improvements

Add/remove experience/education entries

Save/Download:

Click "Save Resume" to store in backend

Click "Download JSON" to save locally

### Project Structure
resume-editor/
├── backend/
│   ├── main.py            # FastAPI server
│   ├── requirements.txt   # Python dependencies
│   └── resume_data.json   # Resume storage
└── frontend/
    ├── src/
    │   ├── components/    # React components
    │   ├── App.jsx        # Main application
    │   └── main.jsx       # Entry point
    ├── package.json       # Frontend dependencies
    └── vite.config.js     # Vite configuration

### Troubleshooting
Common Issues:

Port conflicts:

Backend: Edit main.py to change port (default: 8000)

Frontend: Vite will automatically find an available port

Dependency issues: 
# Frontend:
rm -rf node_modules
npm install

# Backend:
deactivate
rm -rf venv
python -m venv venv
# Reactivate and reinstall dependencies

Connection errors:

Verify both servers are running

Check proxy settings in frontend/vite.config.js

Production Build
To create a production-ready frontend build:
cd frontend
npm run build

### Acknowledgements
React Icons for beautiful SVG icons

Tailwind CSS for utility-first styling

FastAPI for efficient backend services




### Additional Recommendations:

1. Create a `screenshot.png` file showing your application and place it in the root directory
2. Update the repository URL with your actual GitHub URL
3. Consider adding:
   - A "Contributing" section if open-source
   - API documentation if others will extend the backend
   - Environment variables configuration if needed
4. For a complete package, include:
   - `.gitignore` file
   - License file
   - Code of Conduct (for open source)

This README provides:
- Clear installation instructions
- Visual demonstration (via screenshot)
- Concise feature overview
- Troubleshooting guide
- Project structure transparency
- License information


