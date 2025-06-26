import { useState, useEffect } from 'react'
import ResumeUpload from './components/ResumeUpload'
import ResumeForm from './components/ResumeForm'

function App() {
  const [resume, setResume] = useState(null)
  const [activeTab, setActiveTab] = useState('upload')

  useEffect(() => {
    // Load resume data if available
    const fetchResume = async () => {
      try {
        const response = await fetch('/api/get-resume')
        const data = await response.json()
        if (Object.keys(data).length > 0) {
          setResume(data)
          setActiveTab('edit')
        }
      } catch (error) {
        console.error('Error loading resume:', error)
      }
    }
    fetchResume()
  }, [])

  const handleResumeUpload = (resumeData) => {
    setResume(resumeData)
    setActiveTab('edit')
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '1.5rem',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 700,
        marginBottom: '1.5rem',
        textAlign: 'center',
        color: '#1a202c'
      }}>
        Resume Editor
      </h1>
      
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            margin: '0 0.25rem',
            border: 'none',
            backgroundColor: activeTab === 'upload' ? '#4299e1' : 'transparent',
            color: activeTab === 'upload' ? 'white' : '#4a5568',
            fontWeight: 600,
            borderRadius: '0.375rem 0.375rem 0 0',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative',
            bottom: '-1px',
            borderBottom: activeTab === 'upload' ? '2px solid #3182ce' : 'none'
          }}
          onClick={() => setActiveTab('upload')}
        >
          Upload Resume
        </button>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            margin: '0 0.25rem',
            border: 'none',
            backgroundColor: activeTab === 'edit' ? '#4299e1' : 'transparent',
            color: activeTab === 'edit' ? 'white' : !resume ? '#cbd5e0' : '#4a5568',
            fontWeight: 600,
            borderRadius: '0.375rem 0.375rem 0 0',
            cursor: resume ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s ease',
            position: 'relative',
            bottom: '-1px',
            borderBottom: activeTab === 'edit' ? '2px solid #3182ce' : 'none',
            opacity: !resume ? 0.7 : 1
          }}
          onClick={() => resume && setActiveTab('edit')}
          disabled={!resume}
        >
          Edit Resume
        </button>
      </div>

      <div style={{
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        padding: '2rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
      }}>
        {activeTab === 'upload' && (
          <ResumeUpload onUpload={handleResumeUpload} />
        )}

        {activeTab === 'edit' && resume && (
          <ResumeForm resume={resume} setResume={setResume} />
        )}
      </div>

      {!resume && activeTab === 'edit' && (
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          padding: '2rem',
          textAlign: 'center',
          color: '#718096',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
        }}>
          <p style={{ marginBottom: '1rem' }}>No resume data available.</p>
          <button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#4299e1',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontWeight: 500
            }}
            onClick={() => setActiveTab('upload')}
          >
            Upload Resume
          </button>
        </div>
      )}
    </div>
  )
}

export default App