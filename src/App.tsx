import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/MockAuthContext';
import axios from 'axios';
import './App.css';

// API Base URL
const API_BASE_URL = 'https://us-central1-pulsebengaluru-backend.cloudfunctions.net/api';

// Simple Login Component
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
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎯 Khabri Login</h1>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

// Simple Dashboard
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
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>🏠 Khabri Dashboard</h1>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      {/* User Info */}
      <div style={{ padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '2rem' }}>
        <h3>Welcome, {currentUser?.displayName}!</h3>
        <p>📧 {currentUser?.email}</p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={() => setActiveTab('report')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'report' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          📝 Report Incident
        </button>
        <button
          onClick={() => setActiveTab('query')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'query' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          🔍 View Incidents
        </button>
        <button
          onClick={() => setActiveTab('aggregated')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'aggregated' ? '#007bff' : '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          📊 Global Aggregated Reports
        </button>
      </div>

      {/* Content Area */}
      {activeTab === 'report' && <ReportSection onReportSubmit={(report) => setReports([...reports, report])} />}
      {activeTab === 'query' && <QuerySection reports={reports} />}
      {activeTab === 'aggregated' && <AggregatedReportsSection />}
    </div>
  );
};

// Report Section Component
const ReportSection = ({ onReportSubmit }: { onReportSubmit: (report: any) => void }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('pothole');
  const [severity, setSeverity] = useState('medium');
  const [location, setLocation] = useState('MG Road');
  const [submitting, setSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

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
      alert('Incident reported successfully to backend!');
      
      // Reset form
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report. Please try again.');
    }
    
    setSubmitting(false);
  };

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2>📝 Report New Incident</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Incident Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          required
        />
        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="pothole">🛣️ Pothole</option>
          <option value="garbage">🗑️ Garbage</option>
          <option value="water logging">🌊 Water Logging</option>
          <option value="dog bites">🐕 Dog Bites</option>
          <option value="electricity cut">⚡ Electricity Cut</option>
        </select>
        
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
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
        
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
        
        <textarea
          placeholder="Describe the incident in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', resize: 'vertical' }}
          required
        />
        
        {/* Photo/Video Upload Section */}
        <div style={{ 
          padding: '1rem', 
          background: '#f8f9fa', 
          borderRadius: '6px', 
          border: '2px dashed #007bff'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: '#007bff' }}>📷 Attach Photos/Videos *</h4>
          <input
            type="file"
            multiple
            accept="image/*,video/*"
            onChange={(e) => setSelectedFiles(e.target.files)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
              background: 'white'
            }}
            required
          />
          {selectedFiles && selectedFiles.length > 0 && (
            <p style={{ margin: '0.5rem 0 0 0', color: '#28a745', fontSize: '0.9rem' }}>
              ✅ {selectedFiles.length} file(s) selected
            </p>
          )}
          <p style={{ margin: '0.5rem 0 0 0', color: '#6c757d', fontSize: '0.8rem' }}>
            * At least one photo or video is required for report submission
          </p>
        </div>
        
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '0.75rem',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: submitting ? 'not-allowed' : 'pointer'
          }}
        >
          {submitting ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

// Query Section Component
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
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <div>
      <h2>🔍 View Incidents</h2>
      
      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
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
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="all">All Categories</option>
          <option value="pothole">🛣️ Pothole</option>
          <option value="garbage">🗑️ Garbage</option>
          <option value="water logging">🌊 Water Logging</option>
          <option value="dog bites">🐕 Dog Bites</option>
          <option value="electricity cut">⚡ Electricity Cut</option>
        </select>
      </div>
      
      {/* Reports List */}
      {loading ? (
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <p>🔄 Loading incidents from backend...</p>
        </div>
      ) : filteredReports.length === 0 ? (
        <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <p>📋 No incidents found</p>
          <p>Try changing filters or switch to "Report Incident" tab to add one!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredReports.map((report) => (
            <div
              key={report.id}
              style={{
                padding: '1rem',
                border: '1px solid #dee2e6',
                borderRadius: '8px',
                backgroundColor: 'white'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                <h4 style={{ margin: '0', color: '#333' }}>{report.title}</h4>
                <span
                  style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    color: 'white',
                    backgroundColor: getSeverityColor(report.severity)
                  }}
                >
                  {report.severity.toUpperCase()}
                </span>
              </div>
              <p style={{ margin: '0.5rem 0', color: '#666' }}>{report.description}</p>
              <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6c757d' }}>
                <span>📍 {report.locationDisplay || report.location}</span>
                <span>🏷️ {report.category}</span>
                <span>📅 {new Date(report.timestamp).toLocaleString()}</span>
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
