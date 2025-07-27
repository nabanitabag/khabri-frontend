import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/MockAuthContext';
import axios from 'axios';
import './App.css';

// API Base URL
const API_BASE_URL = 'https://us-central1-pulsebengaluru-backend.cloudfunctions.net/api';

// Enhanced Login Component with modern design
const SimpleLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4285f4 0%, #34a853 25%, #fbbc04 75%, #ea4335 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: "'Google Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '3rem',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        animation: 'slideUp 0.6s ease-out'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            animation: 'bounce 2s infinite'
          }}>🎯</div>
          <h1 style={{ 
            fontSize: '2.5rem',
            background: 'linear-gradient(45deg, #4285f4 0%, #ea4335 25%, #fbbc04 50%, #34a853 75%, #4285f4 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 0 0.5rem 0',
            fontWeight: '700'
          }}>Khabri</h1>
          <p style={{ 
            color: '#6b7280',
            fontSize: '1.1rem',
            margin: 0,
            fontWeight: '500'
          }}>Your Civic Voice Matters</p>
        </div>
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ 
                width: '100%',
                padding: '1rem 1.25rem',
                borderRadius: '12px',
                border: '2px solid #e5e7eb',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                backgroundColor: '#f9fafb',
                outline: 'none',
                boxSizing: 'border-box'
              }}
                             onFocus={(e) => {
                 e.target.style.borderColor = '#4285f4';
                 e.target.style.backgroundColor = '#ffffff';
                 e.target.style.transform = 'translateY(-2px)';
                 e.target.style.boxShadow = '0 10px 25px -5px rgba(66, 133, 244, 0.2)';
               }}
               onBlur={(e) => {
                 e.target.style.borderColor = '#e5e7eb';
                 e.target.style.backgroundColor = '#f9fafb';
                 e.target.style.transform = 'translateY(0)';
                 e.target.style.boxShadow = 'none';
               }}
               required
             />
           </div>
           
           <div style={{ position: 'relative' }}>
             <input
               type="password"
               placeholder="Password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               style={{ 
                 width: '100%',
                 padding: '1rem 1.25rem',
                 borderRadius: '12px',
                 border: '2px solid #e5e7eb',
                 fontSize: '1rem',
                 transition: 'all 0.3s ease',
                 backgroundColor: '#f9fafb',
                 outline: 'none',
                 boxSizing: 'border-box'
               }}
               onFocus={(e) => {
                 e.target.style.borderColor = '#4285f4';
                 e.target.style.backgroundColor = '#ffffff';
                 e.target.style.transform = 'translateY(-2px)';
                 e.target.style.boxShadow = '0 10px 25px -5px rgba(66, 133, 244, 0.2)';
               }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.backgroundColor = '#f9fafb';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '1rem 2rem',
              background: loading ? '#9ca3af' : 'linear-gradient(135deg, #4285f4 0%, #34a853 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '1.1rem',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              transform: loading ? 'none' : 'translateY(0)',
              boxShadow: loading ? 'none' : '0 10px 25px -5px rgba(66, 133, 244, 0.4)'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                                 e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(66, 133, 244, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                                 e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(66, 133, 244, 0.4)';
              }
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem',
          padding: '1.5rem',
                     backgroundColor: '#e8f0fe',
           borderRadius: '12px',
           border: '1px solid #4285f4'
        }}>
          <p style={{ 
            margin: '0 0 0.5rem 0',
                         color: '#4285f4',
            fontWeight: '600',
            fontSize: '0.9rem'
          }}>🌟 Demo Credentials</p>
          <p style={{ 
            margin: 0,
            color: '#6b7280',
            fontSize: '0.8rem'
          }}>Any valid email format works!</p>
        </div>
      </div>
    </div>
  );
};

// Enhanced Dashboard with modern card-based design
const SimpleDashboard = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'report' | 'query' | 'aggregated'>('report');
  const [reports, setReports] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e8f0fe 50%, #fef7e0 100%)',
      fontFamily: "'Google Sans', 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    }}>
      {/* Enhanced Header */}
      <header style={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
        padding: '1.5rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div className="header-content" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ 
            fontSize: '2rem',
            animation: 'bounce 2s infinite'
          }}>🏠</div>
                     <h1 className="header-title" style={{ 
             margin: 0,
             fontSize: '2rem',
             background: 'linear-gradient(135deg, #4285f4 0%, #ea4335 25%, #fbbc04 50%, #34a853 75%)',
             backgroundClip: 'text',
             WebkitBackgroundClip: 'text',
             WebkitTextFillColor: 'transparent',
             fontWeight: '700'
           }}>Khabri Dashboard</h1>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <div style={{
             padding: '0.5rem 1rem',
             backgroundColor: '#e8f0fe',
             borderRadius: '20px',
             border: '1px solid #4285f4'
           }}>
             <span style={{ color: '#4285f4', fontWeight: '600', fontSize: '0.9rem' }}>
              👤 {currentUser?.displayName}
            </span>
          </div>
          
          <button
            onClick={handleLogout}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease',
              fontSize: '0.9rem'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(239, 68, 68, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            🚪 Logout
          </button>
        </div>
      </header>

      <div className="dashboard-container" style={{ 
        padding: '2rem',
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Welcome Card */}
        <div className="welcome-card" style={{ 
          background: 'linear-gradient(135deg, #4285f4 0%, #34a853 50%, #fbbc04 100%)',
          borderRadius: '20px',
          padding: '3rem',
          marginBottom: '2rem',
          color: 'white',
          boxShadow: '0 20px 40px -10px rgba(66, 133, 244, 0.3)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '150px',
            height: '150px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite'
          }}></div>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '2rem',
            alignItems: 'center'
          }}>
            <div>
              <h2 style={{ 
                margin: '0 0 1rem 0',
                fontSize: '2.5rem',
                fontWeight: '700'
              }}>Welcome back, {currentUser?.displayName}! 👋</h2>
              <p style={{ 
                margin: '0 0 0.5rem 0',
                fontSize: '1.2rem',
                opacity: 0.9,
                fontWeight: '400'
              }}>📧 {currentUser?.email}</p>
              <p style={{ 
                margin: '0',
                fontSize: '1.1rem',
                opacity: 0.8
              }}>Ready to make your community better? Report incidents or check the latest updates.</p>
            </div>
            
            <div style={{
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏙️</div>
              <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>Civic Dashboard</p>
            </div>
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="tab-navigation" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem', 
          marginBottom: '3rem'
        }}>
          {[
            { key: 'report', icon: '📝', label: 'Report Incident', color: '#34a853', desc: 'Submit new civic issues' },
            { key: 'query', icon: '🔍', label: 'View Incidents', color: '#4285f4', desc: 'Browse reported incidents' },
            { key: 'aggregated', icon: '📊', label: 'Global Reports', color: '#ea4335', desc: 'View analytics & trends' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={{
                padding: '2rem',
                background: activeTab === tab.key 
                  ? `linear-gradient(135deg, ${tab.color} 0%, ${tab.color}dd 100%)`
                  : 'rgba(255, 255, 255, 0.9)',
                color: activeTab === tab.key ? 'white' : '#374151',
                border: activeTab === tab.key ? 'none' : '2px solid #e5e7eb',
                borderRadius: '20px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                backdropFilter: 'blur(10px)',
                boxShadow: activeTab === tab.key 
                  ? `0 15px 35px -5px ${tab.color}40`
                  : '0 8px 25px rgba(0, 0, 0, 0.08)',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab.key) {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.borderColor = tab.color;
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab.key) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                }
              }}
            >
              <span style={{ fontSize: '2.5rem' }}>{tab.icon}</span>
              <div>
                <div style={{ fontWeight: '700', marginBottom: '0.5rem' }}>{tab.label}</div>
                <div style={{ 
                  fontSize: '0.9rem', 
                  opacity: activeTab === tab.key ? 0.9 : 0.7,
                  fontWeight: '400'
                }}>{tab.desc}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Enhanced Content Area */}
        <div className="content-area" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '24px',
          padding: '3rem',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.08)',
          minHeight: '600px'
        }}>
          {activeTab === 'report' && <ReportSection onReportSubmit={(report) => setReports([...reports, report])} />}
          {activeTab === 'query' && <QuerySection reports={reports} />}
          {activeTab === 'aggregated' && <AggregatedReportsSection />}
        </div>
      </div>
    </div>
  );
};

// Enhanced Report Section Component with modern design
const ReportSection = ({ onReportSubmit }: { onReportSubmit: (report: any) => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('pothole');
  const [severity, setSeverity] = useState('medium');
  const [location, setLocation] = useState('MG Road');
  const [submitting, setSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate files are selected (required by backend)
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('❌ Please select at least one photo/video. Files are required for report submission.');
      return;
    }
    
    setSubmitting(true);
    
    try {
      // Get user's location coordinates based on selected area
      const locationCoords = {
        'MG Road': { latitude: 12.9716, longitude: 77.5946 },
        'Koramangala': { latitude: 12.9279, longitude: 77.6271 },
        'HSR Layout': { latitude: 12.9082, longitude: 77.6476 },
        'Indiranagar': { latitude: 12.9784, longitude: 77.6408 },
        'Whitefield': { latitude: 12.9698, longitude: 77.7499 },
        'Jayanagar': { latitude: 12.9254, longitude: 77.5847 },
        'BTM Layout': { latitude: 12.9165, longitude: 77.6101 },
        'Electronic City': { latitude: 12.8606, longitude: 77.6632 }
      };
      
      const locationDetails = {
        'MG Road': { pincode: '560001', ward: 'Ward 123', landmark: 'Near Commercial Street' },
        'Koramangala': { pincode: '560034', ward: 'Ward 152', landmark: 'Near Forum Mall' },
        'HSR Layout': { pincode: '560102', ward: 'Ward 189', landmark: 'Near HSR BDA Complex' },
        'Indiranagar': { pincode: '560038', ward: 'Ward 104', landmark: 'Near 100 Feet Road' },
        'Whitefield': { pincode: '560066', ward: 'Ward 212', landmark: 'Near ITPL' },
        'Jayanagar': { pincode: '560011', ward: 'Ward 156', landmark: 'Near 4th Block' },
        'BTM Layout': { pincode: '560029', ward: 'Ward 188', landmark: 'Near BTM Bus Stand' },
        'Electronic City': { pincode: '560100', ward: 'Ward 198', landmark: 'Near Infosys' }
      };
      
      console.log(`⏳ Submitting report with ${selectedFiles.length} file(s)...`);
      
      // Create FormData for file upload (required when files are included)
      const formData = new FormData();
      
      // Add report data as individual form fields
      formData.append('title', title);
      formData.append('description', description);
      formData.append('type', category);
      formData.append('userSeverity', severity);
      
      // Add location data using bracket notation (standard for Express form parsing)
      const coords = locationCoords[location as keyof typeof locationCoords];
      const details = locationDetails[location as keyof typeof locationDetails];
      
      formData.append('location[coordinates][latitude]', coords.latitude.toString());
      formData.append('location[coordinates][longitude]', coords.longitude.toString());
      formData.append('location[address]', `${location}, Bangalore`);
      formData.append('location[landmark]', details?.landmark || `Near ${location}`);
      formData.append('location[pincode]', details?.pincode || '560001');
      formData.append('location[ward]', details?.ward || 'Ward 123');
      formData.append('location[city]', 'Bangalore');
      formData.append('location[accuracy]', '10');
      
      // Add files (required by backend)
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }
      
      console.log('Submitting FormData with files:', selectedFiles.length);
      
      // Call real backend API using FormData (don't set Content-Type, browser will set it with boundary)
      const response = await axios.post(`${API_BASE_URL}/reports/demo-submit`, formData);
      
      // Add to local state for immediate display
      const localReport = {
        id: response.data.reportId || Date.now(),
        title,
        description,
        category,
        severity,
        location,
        timestamp: new Date().toISOString(),
        status: 'submitted'
      };
      
      onReportSubmit(localReport);
      setShowSuccess(true);
      
      // Reset form
      setTitle('');
      setDescription('');
      setSelectedFiles(null);
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
      
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    }
    
    setSubmitting(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    fontSize: '1rem',
    transition: 'all 0.3s ease',
    backgroundColor: '#f9fafb',
    outline: 'none',
    boxSizing: 'border-box' as const
  };

  const focusStyle = {
    borderColor: '#34a853',
    backgroundColor: '#ffffff',
    transform: 'translateY(-2px)',
    boxShadow: '0 10px 25px -5px rgba(52, 168, 83, 0.2)'
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', animation: 'fadeIn 0.6s ease-out' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="section-title" style={{ 
          fontSize: '3rem',
          margin: '0 0 1rem 0',
          background: 'linear-gradient(135deg, #34a853 0%, #137333 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '700'
        }}>📝 Report New Incident</h2>
        <p style={{ 
          color: '#6b7280',
          fontSize: '1.3rem',
          margin: 0,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>Help make your community better by reporting civic issues</p>
      </div>

      {showSuccess && (
        <div style={{
          background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
          color: '#065f46',
          padding: '1.5rem',
          borderRadius: '16px',
          marginBottom: '2rem',
          textAlign: 'center',
          border: '2px solid #10b981',
          animation: 'slideUp 0.5s ease-out'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🎉</div>
          <strong>Incident reported successfully!</strong>
          <p style={{ margin: '0.5rem 0 0 0', opacity: 0.8 }}>
            Your report has been submitted to the backend system.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {/* Top row - Title spans full width */}
        <div>
          <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            📝 Incident Title
          </label>
          <input
            type="text"
            placeholder="Brief, descriptive title for the incident"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            required
          />
        </div>

        {/* Second row - Three columns for better desktop layout */}
        <div className="form-three-columns" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
              🏷️ Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{...inputStyle, cursor: 'pointer'}}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            >
              <option value="pothole">🛣️ Pothole</option>
              <option value="garbage">🗑️ Garbage</option>
              <option value="water logging">🌊 Water Logging</option>
              <option value="dog bites">🐕 Dog Bites</option>
              <option value="electricity cut">⚡ Electricity Cut</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
              📍 Location
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{...inputStyle, cursor: 'pointer'}}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            >
              <option value="MG Road">📍 MG Road</option>
              <option value="Koramangala">📍 Koramangala</option>
              <option value="HSR Layout">📍 HSR Layout</option>
              <option value="Indiranagar">📍 Indiranagar</option>
              <option value="Whitefield">📍 Whitefield</option>
              <option value="Jayanagar">📍 Jayanagar</option>
              <option value="BTM Layout">📍 BTM Layout</option>
              <option value="Electronic City">📍 Electronic City</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
              ⚡ Severity
            </label>
            <select
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              style={{...inputStyle, cursor: 'pointer'}}
              onFocus={(e) => Object.assign(e.target.style, focusStyle)}
              onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>
        </div>
        
        {/* Description row */}
        <div>
          <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            📝 Description
          </label>
          <textarea
            placeholder="Provide a detailed description of the incident, including any relevant context or urgency..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            style={{...inputStyle, minHeight: '140px', resize: 'vertical', fontFamily: 'inherit'}}
            onFocus={(e) => Object.assign(e.target.style, focusStyle)}
            onBlur={(e) => Object.assign(e.target.style, inputStyle)}
            required
          />
        </div>
        
        {/* Enhanced Photo/Video Upload Section */}
        <div className="file-upload-section" style={{ 
          padding: '3rem', 
          background: 'linear-gradient(135deg, #e6f4ea 0%, #ceead6 100%)', 
          borderRadius: '20px', 
          border: '3px dashed #34a853',
          textAlign: 'center',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#137333';
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = '0 15px 35px rgba(52, 168, 83, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#34a853';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📷</div>
          <h3 style={{ margin: '0 0 1.5rem 0', color: '#34a853', fontWeight: '700', fontSize: '1.5rem' }}>Attach Photos/Videos *</h3>
          <p style={{ margin: '0 0 2rem 0', color: '#6b7280', fontSize: '1.1rem', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
            Upload clear photos or videos that show the incident. Multiple files help provide better context.
          </p>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => setSelectedFiles(e.target.files)}
            style={{
              width: '100%',
              maxWidth: '600px',
              padding: '1.5rem',
              borderRadius: '16px',
              border: '3px solid #34a853',
              background: 'white',
              fontSize: '1.1rem',
              cursor: 'pointer',
              margin: '0 auto',
              display: 'block'
            }}
            required
          />
          {selectedFiles && selectedFiles.length > 0 ? (
            <div style={{ 
              marginTop: '2rem',
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '16px',
                             border: '2px solid #34a853',
               maxWidth: '600px',
               margin: '2rem auto 0'
             }}>
               <p style={{ margin: '0', color: '#137333', fontSize: '1.3rem', fontWeight: '700' }}>
                ✅ {selectedFiles.length} file(s) selected
              </p>
              <p style={{ margin: '0.75rem 0 0 0', color: '#6b7280', fontSize: '1rem' }}>
                Ready to upload with your report!
              </p>
            </div>
          ) : (
            <p style={{ margin: '2rem 0 0 0', color: '#6b7280', fontSize: '1rem', fontStyle: 'italic' }}>
              * At least one photo or video is required for report submission
            </p>
          )}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
          <button
            className="submit-button"
            type="submit"
            disabled={submitting}
            style={{
              padding: '1.5rem 4rem',
                             background: submitting 
                 ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                 : 'linear-gradient(135deg, #34a853 0%, #137333 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              cursor: submitting ? 'not-allowed' : 'pointer',
              fontSize: '1.3rem',
              fontWeight: '700',
              transition: 'all 0.3s ease',
                             boxShadow: submitting ? 'none' : '0 15px 35px -5px rgba(52, 168, 83, 0.4)',
              textTransform: 'uppercase' as const,
              letterSpacing: '1px',
              minWidth: '280px'
            }}
            onMouseEnter={(e) => {
              if (!submitting) {
                e.currentTarget.style.transform = 'translateY(-4px)';
                                 e.currentTarget.style.boxShadow = '0 20px 45px -5px rgba(52, 168, 83, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!submitting) {
                e.currentTarget.style.transform = 'translateY(0)';
                                 e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(52, 168, 83, 0.4)';
              }
            }}
          >
            {submitting ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <span style={{ animation: 'spin 1s linear infinite', fontSize: '1.8rem' }}>⏳</span>
                Submitting Report...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                🚀 Submit Report
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Enhanced Query Section Component with modern design
const QuerySection = ({ reports }: { reports: any[] }) => {
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [backendReports, setBackendReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // Fetch reports from backend on component mount
  useEffect(() => {
    fetchBackendReports();
  }, []);
  
  const fetchBackendReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/reports`);
      const fetchedReports = response.data.reports || [];
      
      console.log('Fetched reports from backend:', fetchedReports);
      
      // Transform backend data to match our local format
      const transformedReports = fetchedReports.map((report: any) => {
        // Parse location from backend response
        let parsedLocation = 'Unknown';
        if (report.location?.address) {
          if (report.location.address.includes('MG Road')) parsedLocation = 'MG Road';
          else if (report.location.address.includes('Koramangala')) parsedLocation = 'Koramangala';
          else if (report.location.address.includes('HSR')) parsedLocation = 'HSR Layout';
        }
        
        // Parse Firebase timestamp (_seconds format)
        let parsedTimestamp;
        if (report.basic?.timestamp?._seconds) {
          parsedTimestamp = new Date(report.basic.timestamp._seconds * 1000).toISOString();
        } else if (report.createdAt) {
          parsedTimestamp = new Date(report.createdAt).toISOString();
        } else {
          parsedTimestamp = new Date().toISOString();
        }
        
        // Show ward if present, else show pincode
        const locationDisplay = report.location?.ward || report.location?.pincode || parsedLocation;
        
        return {
          id: report.reportId || report.id || Date.now(),
          title: report.basic?.title || 'Untitled Report',
          description: report.basic?.description || 'No description provided',
          category: report.basic?.type || 'pothole',
          severity: report.basic?.userSeverity || report.basic?.finalSeverity || 'medium',
          location: parsedLocation,
          locationDisplay, // Ward or pincode for display
          timestamp: parsedTimestamp,
          status: report.basic?.status || 'pending'
        };
      });
      
      setBackendReports(transformedReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      // Fallback to local reports if backend fails
    }
    setLoading(false);
  };
  
  // Combine local and backend reports
  const allReports = [...reports, ...backendReports];
  
  const filteredReports = allReports.filter(report => {
    const locationMatch = selectedLocation === 'all' || report.location === selectedLocation;
    const categoryMatch = selectedCategory === 'all' || report.category === selectedCategory;
    return locationMatch && categoryMatch;
  });
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getSeverityBg = (severity: string) => {
    switch (severity) {
      case 'high': return 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)';
      case 'medium': return 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)';
      case 'low': return 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)';
      default: return 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
    }
  };

  const selectStyle = {
    padding: '1rem 1.25rem',
    borderRadius: '12px',
    border: '2px solid #e5e7eb',
    fontSize: '1rem',
    backgroundColor: '#f9fafb',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',
    flex: 1
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', animation: 'fadeIn 0.6s ease-out' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 className="section-title" style={{ 
          fontSize: '3rem',
          margin: '0 0 1rem 0',
          background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '700'
        }}>🔍 View Incidents</h2>
        <p style={{ 
          color: '#6b7280',
          fontSize: '1.3rem',
          margin: 0,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>Browse and filter reported civic incidents in your area</p>
      </div>
      
      {/* Enhanced Filters */}
      <div style={{ 
        background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
        padding: '2rem',
        borderRadius: '16px',
        marginBottom: '2rem',
        border: '1px solid #3b82f6'
      }}>
        <h3 style={{ 
          margin: '0 0 1.5rem 0', 
          color: '#1d4ed8', 
          fontWeight: '700',
          fontSize: '1.3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          🎛️ Filter Options
        </h3>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              📍 Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={selectStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.backgroundColor = '#ffffff';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.backgroundColor = '#f9fafb';
              }}
            >
              <option value="all">All Locations</option>
              <option value="MG Road">📍 MG Road</option>
              <option value="Koramangala">📍 Koramangala</option>
              <option value="HSR Layout">📍 HSR Layout</option>
              <option value="Indiranagar">📍 Indiranagar</option>
              <option value="Whitefield">📍 Whitefield</option>
              <option value="Jayanagar">📍 Jayanagar</option>
              <option value="BTM Layout">📍 BTM Layout</option>
              <option value="Electronic City">📍 Electronic City</option>
            </select>
          </div>
          
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label style={{ display: 'block', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              🏷️ Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={selectStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.backgroundColor = '#ffffff';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.backgroundColor = '#f9fafb';
              }}
            >
              <option value="all">All Categories</option>
              <option value="pothole">🛣️ Pothole</option>
              <option value="garbage">🗑️ Garbage</option>
              <option value="water logging">🌊 Water Logging</option>
              <option value="dog bites">🐕 Dog Bites</option>
              <option value="electricity cut">⚡ Electricity Cut</option>
            </select>
          </div>
          
          <button
            onClick={fetchBackendReports}
            disabled={loading}
            style={{
              padding: '1rem 2rem',
              background: loading 
                ? 'linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)'
                : 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              alignSelf: 'end'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {loading ? (
              <>
                <span style={{ animation: 'spin 1s linear infinite' }}>⏳</span>
                Refreshing...
              </>
            ) : (
              <>
                🔄 Refresh
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Enhanced Reports List */}
      {loading ? (
        <div style={{ 
          padding: '3rem', 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', 
          borderRadius: '16px',
          border: '2px solid #0ea5e9'
        }}>
          <div style={{ 
            fontSize: '3rem', 
            marginBottom: '1rem',
            animation: 'spin 2s linear infinite'
          }}>🔄</div>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#0369a1',
            fontWeight: '600',
            margin: '0'
          }}>Loading incidents from backend...</p>
        </div>
      ) : filteredReports.length === 0 ? (
        <div style={{ 
          padding: '3rem', 
          textAlign: 'center', 
          background: 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)', 
          borderRadius: '16px',
          border: '2px solid #f59e0b'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
          <h3 style={{ 
            margin: '0 0 1rem 0', 
            color: '#92400e',
            fontWeight: '700',
            fontSize: '1.5rem'
          }}>No incidents found</h3>
          <p style={{ 
            margin: '0',
            color: '#a16207',
            fontSize: '1.1rem'
          }}>Try changing filters or switch to "Report Incident" tab to add one!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <h3 style={{ 
              margin: 0,
              color: '#374151',
              fontSize: '1.3rem',
              fontWeight: '700'
            }}>
              📊 Found {filteredReports.length} incident{filteredReports.length !== 1 ? 's' : ''}
            </h3>
          </div>
          
          {filteredReports.map((report, index) => (
            <div
              key={report.id}
              style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                borderRadius: '16px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
                e.currentTarget.style.borderColor = getSeverityColor(report.severity);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.borderColor = '#e5e7eb';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <h4 style={{ 
                  margin: '0', 
                  color: '#111827',
                  fontSize: '1.3rem',
                  fontWeight: '700',
                  flex: 1
                }}>{report.title}</h4>
                <span
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    color: getSeverityColor(report.severity),
                    background: getSeverityBg(report.severity),
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginLeft: '1rem'
                  }}
                >
                  {report.severity}
                </span>
              </div>
              
              <p style={{ 
                margin: '0 0 1.5rem 0', 
                color: '#4b5563',
                fontSize: '1rem',
                lineHeight: '1.6'
              }}>{report.description}</p>
              
              <div style={{ 
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                borderRadius: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>📍</span>
                  <span style={{ color: '#374151', fontWeight: '600' }}>
                    {report.locationDisplay || report.location}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>🏷️</span>
                  <span style={{ color: '#374151', fontWeight: '600' }}>
                    {report.category}
                  </span>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>📅</span>
                  <span style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                    {new Date(report.timestamp).toLocaleDateString()} at {new Date(report.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Aggregated Reports Section Component
const AggregatedReportsSection = () => {
  const [aggregatedReports, setAggregatedReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAggregatedReports = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching aggregated reports from backend...');
      const response = await axios.get(`${API_BASE_URL}/aggregation/issues`);
      
      if (response.data && response.data.aggregatedIssues) {
        console.log('Fetched aggregated reports:', response.data.aggregatedIssues);
        setAggregatedReports(response.data.aggregatedIssues);
      } else {
        console.log('No aggregated reports found in response');
        setAggregatedReports([]);
      }
    } catch (error) {
      console.error('Error fetching aggregated reports:', error);
      setError('Failed to load aggregated reports');
    }
    
    setLoading(false);
  };

  useEffect(() => {
    fetchAggregatedReports();
  }, []);

  const formatTimestamp = (timestamp: any) => {
    if (timestamp && timestamp._seconds) {
      return new Date(timestamp._seconds * 1000).toLocaleString();
    }
    return 'Unknown';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': return '#007bff';
      case 'resolved': return '#28a745';
      case 'in_progress': return '#ffc107';
      default: return '#6c757d';
    }
  };

  return (
    <div style={{ maxWidth: '1200px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>📊 Global Aggregated Reports</h2>
        <button
          onClick={fetchAggregatedReports}
          disabled={loading}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? '🔄 Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {error && (
        <div style={{ 
          padding: '1rem', 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          borderRadius: '4px', 
          marginBottom: '1rem',
          border: '1px solid #f5c6cb'
        }}>
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>🔄 Loading aggregated reports...</p>
        </div>
      ) : aggregatedReports.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '2px dashed #dee2e6'
        }}>
          <p>📊 No aggregated reports available</p>
          <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>Aggregated reports will appear here once multiple incidents are clustered by the system</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {aggregatedReports.map((report) => (
            <div
              key={report.aggregationId}
              style={{
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                padding: '1.5rem',
                backgroundColor: 'white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              {/* Header with title and status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{report.title}</h3>
                  <p style={{ margin: '0', color: '#666', fontSize: '0.9rem' }}>{report.description}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: getSeverityColor(report.severity),
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>
                    {report.severity?.toUpperCase()}
                  </span>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: getStatusColor(report.status),
                    color: 'white',
                    borderRadius: '12px',
                    fontSize: '0.75rem'
                  }}>
                    {report.status?.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Key Metrics */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: '1rem',
                marginBottom: '1rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff' }}>
                    {report.metrics?.reportCount || 0}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Reports</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#28a745' }}>
                    {report.metrics?.uniqueReporters || 0}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Unique Reporters</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ffc107' }}>
                    {report.metrics?.hotspotScore || 0}%
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Hotspot Score</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#6f42c1' }}>
                    {(report.media?.totalPhotos || 0) + (report.media?.totalVideos || 0)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>Media Files</div>
                </div>
              </div>

              {/* Location Information */}
              <div style={{ marginBottom: '1rem' }}>
                <strong>📍 Location:</strong>
                <div style={{ marginLeft: '1rem', color: '#666' }}>
                  <div>{report.location?.address}</div>
                  <div>{report.location?.ward && report.location.ward !== 'Ward' ? report.location.ward : report.location?.pincode} • {report.location?.city}</div>
                  {report.location?.radius && (
                    <div style={{ fontSize: '0.9rem', color: '#999' }}>Radius: {report.location.radius}m</div>
                  )}
                </div>
              </div>

              {/* Insights */}
              {report.insights && (
                <div style={{ marginBottom: '1rem' }}>
                  <strong>💡 Insights:</strong>
                  <div style={{ marginLeft: '1rem', marginTop: '0.5rem' }}>
                    {report.insights.summary && (
                      <p style={{ margin: '0 0 0.5rem 0', color: '#666' }}>{report.insights.summary}</p>
                    )}
                    
                    {report.insights.urgencyFactors && report.insights.urgencyFactors.length > 0 && (
                      <div style={{ marginBottom: '0.5rem' }}>
                        <strong style={{ fontSize: '0.9rem' }}>⚠️ Urgency Factors:</strong>
                        <ul style={{ margin: '0.25rem 0', paddingLeft: '1.5rem' }}>
                          {report.insights.urgencyFactors.map((factor: string, index: number) => (
                            <li key={index} style={{ fontSize: '0.9rem', color: '#666' }}>{factor}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {report.insights.recommendations && report.insights.recommendations.length > 0 && (
                      <div>
                        <strong style={{ fontSize: '0.9rem' }}>✅ Recommendations:</strong>
                        <ul style={{ margin: '0.25rem 0', paddingLeft: '1.5rem' }}>
                          {report.insights.recommendations.map((rec: string, index: number) => (
                            <li key={index} style={{ fontSize: '0.9rem', color: '#666' }}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Timestamps */}
              <div style={{ 
                fontSize: '0.85rem', 
                color: '#999',
                borderTop: '1px solid #eee',
                paddingTop: '0.75rem',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span>First Reported: {formatTimestamp(report.metrics?.firstReported)}</span>
                <span>Last Updated: {formatTimestamp(report.metrics?.lastUpdated)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<SimpleLogin />} />
            <Route path="/dashboard" element={<SimpleDashboard />} />
            <Route path="*" element={<SimpleLogin />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
