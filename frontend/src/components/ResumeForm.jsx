import { useState } from 'react';
import { FiDownload, FiSave, FiPlus, FiTrash2, FiEdit2, FiAward, FiBriefcase, FiUser, FiBook } from 'react-icons/fi';

const ResumeForm = ({ resume, setResume }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(null);
  const [activeSection, setActiveSection] = useState('basic');

  // Handle input changes
  const handleInputChange = (e, section, index = null) => {
    const { name, value } = e.target;
    setResume(prev => {
      if (index !== null) {
        const updatedSection = [...prev[section]];
        updatedSection[index] = { ...updatedSection[index], [name]: value };
        return { ...prev, [section]: updatedSection };
      } else {
        return { ...prev, [name]: value };
      }
    });
  };

  // Add new entry to a section
  const handleAddEntry = (section) => {
    const defaultEntry = section === 'experience' ? {
      id: Date.now(),
      title: '',
      company: '',
      duration: '',
      description: ''
    } : {
      id: Date.now(),
      degree: '',
      institution: '',
      year: ''
    };
    
    setResume(prev => ({
      ...prev,
      [section]: [...prev[section], defaultEntry]
    }));
  };

  // Remove entry from a section
  const handleRemoveEntry = (section, id) => {
    setResume(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  // AI enhancement mock
  const enhanceSection = async (section) => {
    setIsEnhancing(section);
    try {
      const content = typeof resume[section] === 'string' 
        ? resume[section] 
        : JSON.stringify(resume[section]);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const enhancedContent = `[AI-Enhanced] ${content} (Improved with simulated AI)`;
      
      setResume(prev => ({
        ...prev,
        [section]: typeof prev[section] === 'string' 
          ? enhancedContent 
          : JSON.parse(enhancedContent.replace('[AI-Enhanced] ', '').replace(' (Improved with simulated AI)', ''))
      }));
    } catch (error) {
      console.error('Error enhancing section:', error);
    } finally {
      setIsEnhancing(null);
    }
  };

  // Save resume
  const saveResume = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Resume saved successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Failed to save resume.');
    } finally {
      setIsSaving(false);
    }
  };

  // Download resume as JSON
  const downloadResume = () => {
    const dataStr = JSON.stringify(resume, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileName = `${resume.name?.replace(' ', '_') || 'resume'}_resume.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  };

  // Section navigation
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Sidebar Navigation */}
      <div style={{
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 10,
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#1e293b',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                backgroundColor: '#3b82f6',
                color: 'white',
                borderRadius: '50%',
                fontSize: '1rem'
              }}>R</span>
              Resume Builder
            </h1>
          </div>
          <div style={{
            display: 'flex',
            gap: '0.5rem'
          }}>
            <button 
              onClick={saveResume}
              disabled={isSaving}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: isSaving ? '#93c5fd' : '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontWeight: 500,
                cursor: isSaving ? 'not-allowed' : 'pointer',
                transition: 'background-color 0.2s ease'
              }}
            >
              {isSaving ? (
                <>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    display: 'inline-block'
                  }} />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave />
                  Save
                </>
              )}
            </button>
            <button 
              onClick={downloadResume}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '0.375rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
            >
              <FiDownload />
              Download
            </button>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        padding: '1rem'
      }}>
        {/* Main Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          width: '100%'
        }}>
          {/* Basic Information Section */}
          <section id="basic" style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#f1f5f9',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <FiUser style={{ color: '#3b82f6' }} />
                Basic Information
              </h2>
            </div>
            <div style={{
              padding: '1.5rem',
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1rem'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#334155'
                  }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={resume.name || ''}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#334155'
                  }}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={resume.email || ''}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#334155'
                  }}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={resume.phone || ''}
                    onChange={handleInputChange}
                    placeholder="(123) 456-7890"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: '#334155'
                  }}>Location</label>
                  <input
                    type="text"
                    name="location"
                    value={resume.location || ''}
                    onChange={handleInputChange}
                    placeholder="City, Country"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #cbd5e1',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Professional Summary Section */}
          <section id="summary" style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#f1f5f9',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <FiEdit2 style={{ color: '#3b82f6' }} />
                Professional Summary
              </h2>
              <button 
                onClick={() => enhanceSection('summary')}
                disabled={isEnhancing === 'summary'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: isEnhancing === 'summary' ? '#ddd6fe' : '#ede9fe',
                  color: '#5b21b6',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: isEnhancing === 'summary' ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                {isEnhancing === 'summary' ? (
                  <>
                    <span style={{
                      width: '14px',
                      height: '14px',
                      border: '2px solid rgba(91, 33, 182, 0.3)',
                      borderTopColor: '#5b21b6',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      display: 'inline-block'
                    }} />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.75 17L9 20L8 21H16L15 20L14.25 17M3 13H21M5 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17Z" stroke="#5b21b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Enhance with AI
                  </>
                )}
              </button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ position: 'relative' }}>
                <textarea
                  name="summary"
                  value={resume.summary || ''}
                  onChange={handleInputChange}
                  placeholder="Briefly describe your professional background, skills, and achievements..."
                  style={{
                    width: '100%',
                    minHeight: '150px',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '0.75rem',
                  right: '0.75rem',
                  fontSize: '0.75rem',
                  color: '#64748b'
                }}>
                  {resume.summary?.length || 0}/500
                </div>
              </div>
              {resume.summary?.includes('(Improved with simulated AI)') && (
                <div style={{
                  marginTop: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#5b21b6',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#5b21b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  AI-enhanced content
                </div>
              )}
            </div>
          </section>

          {/* Work Experience Section */}
          <section id="experience" style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#f1f5f9',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <FiBriefcase style={{ color: '#3b82f6' }} />
                Work Experience
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => enhanceSection('experience')}
                  disabled={isEnhancing === 'experience'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: isEnhancing === 'experience' ? '#ddd6fe' : '#ede9fe',
                    color: '#5b21b6',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: isEnhancing === 'experience' ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  {isEnhancing === 'experience' ? (
                    <>
                      <span style={{
                        width: '14px',
                        height: '14px',
                        border: '2px solid rgba(91, 33, 182, 0.3)',
                        borderTopColor: '#5b21b6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        display: 'inline-block'
                      }} />
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.75 17L9 20L8 21H16L15 20L14.25 17M3 13H21M5 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17Z" stroke="#5b21b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Enhance with AI
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleAddEntry('experience')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dbeafe',
                    color: '#1d4ed8',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <FiPlus />
                  Add Experience
                </button>
              </div>
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {resume.experience?.length > 0 ? (
                resume.experience.map((exp, index) => (
                  <div key={exp.id} style={{
                    backgroundColor: '#f8fafc',
                    padding: '1.25rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e2e8f0',
                    transition: 'border-color 0.2s ease'
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '1rem',
                      marginBottom: '1rem'
                    }}>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: '#334155'
                        }}>Job Title</label>
                        <input
                          type="text"
                          name="title"
                          value={exp.title}
                          onChange={(e) => handleInputChange(e, 'experience', index)}
                          placeholder="e.g., Senior Software Engineer"
                          style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: '#334155'
                        }}>Company</label>
                        <input
                          type="text"
                          name="company"
                          value={exp.company}
                          onChange={(e) => handleInputChange(e, 'experience', index)}
                          placeholder="e.g., Tech Corp Inc."
                          style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: '#334155'
                        }}>Duration</label>
                        <input
                          type="text"
                          name="duration"
                          value={exp.duration}
                          onChange={(e) => handleInputChange(e, 'experience', index)}
                          placeholder="e.g., Jan 2020 - Present"
                          style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#334155'
                      }}>Description</label>
                      <textarea
                        name="description"
                        value={exp.description}
                        onChange={(e) => handleInputChange(e, 'experience', index)}
                        placeholder="Describe your responsibilities and achievements..."
                        style={{
                          width: '100%',
                          minHeight: '100px',
                          padding: '0.5rem 0.75rem',
                          border: '1px solid #cbd5e1',
                          borderRadius: '0.375rem',
                          fontSize: '0.875rem',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                          outline: 'none',
                          resize: 'vertical'
                        }}
                      />
                    </div>
                    <div style={{
                      marginTop: '0.75rem',
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}>
                      <button
                        onClick={() => handleRemoveEntry('experience', exp.id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          backgroundColor: 'transparent',
                          color: '#dc2626',
                          border: 'none',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'color 0.2s ease'
                        }}
                      >
                        <FiTrash2 />
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.5rem',
                  border: '1px dashed #cbd5e1'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    color: '#64748b'
                  }}>
                    <FiBriefcase size={24} />
                  </div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '0.5rem'
                  }}>No experience added</h3>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.875rem',
                    marginBottom: '1rem'
                  }}>Add your work experience to showcase your professional journey</p>
                  <button
                    onClick={() => handleAddEntry('experience')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#dbeafe',
                      color: '#1d4ed8',
                      border: 'none',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      margin: '0 auto'
                    }}
                  >
                    <FiPlus />
                    Add First Experience
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Education Section */}
          <section id="education" style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#f1f5f9',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <FiBook style={{ color: '#3b82f6' }} />
                Education
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => enhanceSection('education')}
                  disabled={isEnhancing === 'education'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: isEnhancing === 'education' ? '#ddd6fe' : '#ede9fe',
                    color: '#5b21b6',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: isEnhancing === 'education' ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  {isEnhancing === 'education' ? (
                    <>
                      <span style={{
                        width: '14px',
                        height: '14px',
                        border: '2px solid rgba(91, 33, 182, 0.3)',
                        borderTopColor: '#5b21b6',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        display: 'inline-block'
                      }} />
                      Enhancing...
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.75 17L9 20L8 21H16L15 20L14.25 17M3 13H21M5 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17Z" stroke="#5b21b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Enhance with AI
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleAddEntry('education')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dbeafe',
                    color: '#1d4ed8',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <FiPlus />
                  Add Education
                </button>
              </div>
            </div>
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {resume.education?.length > 0 ? (
                resume.education.map((edu, index) => (
                  <div key={edu.id} style={{
                    backgroundColor: '#f8fafc',
                    padding: '1.25rem',
                    borderRadius: '0.5rem',
                    border: '1px solid #e2e8f0',
                    transition: 'border-color 0.2s ease'
                  }}>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr 1fr',
                      gap: '1rem'
                    }}>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: '#334155'
                        }}>Degree</label>
                        <input
                          type="text"
                          name="degree"
                          value={edu.degree}
                          onChange={(e) => handleInputChange(e, 'education', index)}
                          placeholder="e.g., Bachelor of Science"
                          style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: '#334155'
                        }}>Institution</label>
                        <input
                          type="text"
                          name="institution"
                          value={edu.institution}
                          onChange={(e) => handleInputChange(e, 'education', index)}
                          placeholder="e.g., University of Technology"
                          style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                            outline: 'none'
                          }}
                        />
                      </div>
                      <div>
                        <label style={{
                          display: 'block',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: '#334155'
                        }}>Year</label>
                        <input
                          type="text"
                          name="year"
                          value={edu.year}
                          onChange={(e) => handleInputChange(e, 'education', index)}
                          placeholder="e.g., 2015 - 2019"
                          style={{
                            width: '100%',
                            padding: '0.5rem 0.75rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '0.375rem',
                            fontSize: '0.875rem',
                            transition: 'border-color 0.2s, box-shadow 0.2s',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>
                    <div style={{
                      marginTop: '0.75rem',
                      display: 'flex',
                      justifyContent: 'flex-end'
                    }}>
                      <button
                        onClick={() => handleRemoveEntry('education', edu.id)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          padding: '0.25rem 0.5rem',
                          backgroundColor: 'transparent',
                          color: '#dc2626',
                          border: 'none',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'color 0.2s ease'
                        }}
                      >
                        <FiTrash2 />
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '2rem',
                  backgroundColor: '#f8fafc',
                  borderRadius: '0.5rem',
                  border: '1px dashed #cbd5e1'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    color: '#64748b'
                  }}>
                                       <FiBook size={24} />
                  </div>
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: '#334155',
                    marginBottom: '0.5rem'
                  }}>No education added</h3>
                  <p style={{
                    color: '#64748b',
                    fontSize: '0.875rem',
                    marginBottom: '1rem'
                  }}>Add your educational background to showcase your qualifications</p>
                  <button
                    onClick={() => handleAddEntry('education')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: '#dbeafe',
                      color: '#1d4ed8',
                      border: 'none',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease',
                      margin: '0 auto'
                    }}
                  >
                    <FiPlus />
                    Add First Education
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <div style={{
              padding: '1rem 1.5rem',
              backgroundColor: '#f1f5f9',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 600,
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}>
                <FiAward style={{ color: '#3b82f6' }} />
                Skills
              </h2>
              <button 
                onClick={() => enhanceSection('skills')}
                disabled={isEnhancing === 'skills'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: isEnhancing === 'skills' ? '#ddd6fe' : '#ede9fe',
                  color: '#5b21b6',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  cursor: isEnhancing === 'skills' ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s ease'
                }}
              >
                {isEnhancing === 'skills' ? (
                  <>
                    <span style={{
                      width: '14px',
                      height: '14px',
                      border: '2px solid rgba(91, 33, 182, 0.3)',
                      borderTopColor: '#5b21b6',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      display: 'inline-block'
                    }} />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.75 17L9 20L8 21H16L15 20L14.25 17M3 13H21M5 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17Z" stroke="#5b21b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Enhance with AI
                  </>
                )}
              </button>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <div style={{ position: 'relative' }}>
                <textarea
                  name="skills"
                  value={resume.skills || ''}
                  onChange={handleInputChange}
                  placeholder="List your key skills (e.g., JavaScript, Project Management, UI/UX Design)..."
                  style={{
                    width: '100%',
                    minHeight: '100px',
                    padding: '0.75rem',
                    border: '1px solid #cbd5e1',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: '0.75rem',
                  right: '0.75rem',
                  fontSize: '0.75rem',
                  color: '#64748b'
                }}>
                    {resume.skills?.length || 0}/500
                </div>
              </div>
              {resume.skills?.includes('(Improved with simulated AI)') && (
                <div style={{
                  marginTop: '0.5rem',
                  fontSize: '0.875rem',
                  color: '#5b21b6',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#5b21b6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  AI-enhanced content
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Animation for spinner */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default ResumeForm;