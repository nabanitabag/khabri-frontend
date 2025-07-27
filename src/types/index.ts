// User types
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

// Report types
export interface Report {
  id: string;
  type: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  severity: 'low' | 'medium' | 'high';
  status: 'pending' | 'under_review' | 'resolved' | 'rejected';
  reportedBy: string;
  reportedAt: string;
  images?: string[];
  upvotes?: number;
  downvotes?: number;
  location?: {
    address: string;
    landmark?: string;
  };
}

// Location types
export interface Location {
  name: string;
  displayName: string;
  latitude: number;
  longitude: number;
  radius: number;
}

// Predefined locations (matching your backend)
export const PREDEFINED_LOCATIONS: Location[] = [
  {
    name: 'mg_road',
    displayName: 'MG Road Area',
    latitude: 12.9716,
    longitude: 77.5946,
    radius: 2
  },
  {
    name: 'koramangala',
    displayName: 'Koramangala',
    latitude: 12.9352,
    longitude: 77.6245,
    radius: 3
  },
  {
    name: 'hsr_layout',
    displayName: 'HSR Layout',
    latitude: 12.9082,
    longitude: 77.6476,
    radius: 2.5
  }
];

// Form types
export interface ReportFormData {
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  images?: FileList;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ReportsResponse {
  reports: Report[];
  total: number;
  page: number;
  limit: number;
}

export interface AggregationResponse {
  location: string;
  issues: Report[];
  summary: {
    total: number;
    byStatus: Record<string, number>;
    bySeverity: Record<string, number>;
    byType: Record<string, number>;
  };
}
