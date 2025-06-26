import { useState } from 'react'

const ResumeUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleUpload = async () => {
    if (!file) return

    setIsUploading(true)
    
    // Simulate file parsing (in a real app, you'd send to backend)
    setTimeout(() => {
      const dummyResume = {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "(123) 456-7890",
        summary: "Experienced software developer with 5+ years in web development.",
        experience: [
          {
            id: 1,
            title: "Senior Developer",
            company: "Tech Corp",
            duration: "2020 - Present",
            description: "Lead a team of developers building web applications."
          }
        ],
        education: [
          {
            id: 1,
            degree: "B.S. Computer Science",
            institution: "State University",
            year: "2015 - 2019"
          }
        ],
        skills: ["JavaScript", "React", "Python", "FastAPI"]
      }
      
      onUpload(dummyResume)
      setIsUploading(false)
    }, 1500)
  }

  return (
    <div 
      className="upload-container"
      style={{
        padding: '2rem',
        border: '1px solid #e2e8f0',
        borderRadius: '0.5rem',
        maxWidth: '28rem',
        margin: '0 auto',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
      }}
    >
      <h2 
        className="text-xl font-semibold mb-4"
        style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          marginBottom: '1rem',
          color: '#1a202c'
        }}
      >
        Upload Your Resume
      </h2>
      <div 
        className="mb-4"
        style={{ marginBottom: '1rem' }}
      >
        <label 
          className="block mb-2"
          style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#4a5568',
            fontWeight: 500
          }}
        >
          Select file (PDF or DOCX):
        </label>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            display: 'inline-block',
            width: '100%'
          }}
        >
          <input 
            type="file" 
            accept=".pdf,.docx" 
            onChange={handleFileChange}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              opacity: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer'
            }}
          />
          <button
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem 1rem',
              backgroundColor: '#edf2f7',
              border: '1px solid #cbd5e0',
              borderRadius: '0.375rem',
              color: '#4a5568',
              fontSize: '0.875rem',
              fontWeight: 500,
              width: '100%',
              textAlign: 'left'
            }}
          >
            {file ? file.name : 'Choose file...'}
          </button>
        </div>
      </div>
      <button 
        onClick={handleUpload}
        disabled={!file || isUploading}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0.625rem 1.25rem',
          backgroundColor: (!file || isUploading) ? '#cbd5e0' : '#4299e1',
          color: 'white',
          fontWeight: 600,
          borderRadius: '0.375rem',
          border: 'none',
          cursor: (!file || isUploading) ? 'not-allowed' : 'pointer',
          width: '100%',
          transition: 'background-color 0.2s ease',
          ':hover': {
            backgroundColor: (!file || isUploading) ? '#cbd5e0' : '#3182ce'
          }
        }}
      >
        {isUploading ? (
          <>
            <svg
              style={{
                animation: 'spin 1s linear infinite',
                width: '1rem',
                height: '1rem',
                marginRight: '0.5rem'
              }}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z"
              />
            </svg>
            Processing...
          </>
        ) : 'Upload & Parse'}
      </button>
      <p 
        className="mt-4 text-sm text-gray-600"
        style={{
          marginTop: '1rem',
          fontSize: '0.875rem',
          color: '#718096',
          textAlign: 'center'
        }}
      >
        Note: This is a demo. Actual file parsing would happen on the backend.
      </p>
    </div>
  )
}

export default ResumeUpload