import axios from 'axios';

// API base URL from your deployed backend
const API_BASE_URL = 'https://asia-south1-khabri-production.cloudfunctions.net/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token (disabled for mock auth)
// Note: Auth interceptor disabled while using mock auth

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API endpoints
export const api = {
  // Health check
  health: () => apiClient.get('/health'),
  
  // Reports
  getReports: (params?: {
    lat?: number;
    lon?: number;
    radius?: number;
    type?: string;
    status?: string;
    limit?: number;
  }) => apiClient.get('/reports', { params }),
  
  submitReport: (reportData: {
    type: string;
    description: string;
    latitude: number;
    longitude: number;
    severity: 'low' | 'medium' | 'high';
    images?: string[];
  }) => apiClient.post('/reports', reportData),
  
  // Aggregation
  getIssuesByLocation: (params: {
    lat: number;
    lon: number;
    radius?: number;
    status?: string;
    type?: string;
    severity?: string;
  }) => apiClient.get('/aggregation/issues', { params }),
};

export default apiClient;
