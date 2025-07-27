import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { api } from '../services/api';
import type { Report, Location } from '../types';
import { PREDEFINED_LOCATIONS } from '../types';

const QueryContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const LocationSelector = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e1e5e9;
`;

const LocationLabel = styled.label`
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const LocationSelect = styled.select`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const LocationInfo = styled.div`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const FilterSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e1e5e9;
`;

const FilterTitle = styled.h3`
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.2rem;
`;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterSelect = styled.select`
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 0.9rem;
  background: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const IncidentsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e1e5e9;
`;

const IncidentsTitle = styled.h3`
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.3rem;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const LoadingSpinner = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const IncidentCard = styled.div`
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

const IncidentHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const IncidentTitle = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: #333;
  flex: 1;
`;

const SeverityBadge = styled.span<{ severity: 'low' | 'medium' | 'high' }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch (props.severity) {
      case 'high': return '#fee2e2';
      case 'medium': return '#fef3c7';
      case 'low': return '#dcfce7';
      default: return '#f3f4f6';
    }
  }};
  color: ${props => {
    switch (props.severity) {
      case 'high': return '#dc2626';
      case 'medium': return '#d97706';
      case 'low': return '#16a34a';
      default: return '#6b7280';
    }
  }};
`;

const IncidentLocation = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const IncidentTime = styled.div`
  color: #666;
  font-size: 0.9rem;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  border: 1px solid #f5c6cb;
`;

const QuerySection: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [incidents, setIncidents] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    severity: 'all'
  });

  const handleLocationChange = (locationName: string) => {
    const location = PREDEFINED_LOCATIONS.find(loc => loc.name === locationName);
    setSelectedLocation(location || null);
  };

  const fetchIncidents = async () => {
    if (!selectedLocation) return;

    try {
      setLoading(true);
      setError('');

      const params = {
        lat: selectedLocation.latitude,
        lon: selectedLocation.longitude,
        radius: selectedLocation.radius,
        ...(filters.status !== 'all' && { status: filters.status }),
        ...(filters.category !== 'all' && { type: filters.category }),
        ...(filters.severity !== 'all' && { severity: filters.severity })
      };

      const response = await api.getIssuesByLocation(params);
      setIncidents(response.data.issues || []);
    } catch (error: any) {
      console.error('Failed to fetch incidents:', error);
      setError('Failed to fetch incidents. Please try again.');
      setIncidents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      fetchIncidents();
    }
  }, [selectedLocation, filters]);

  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const getSeverityIcon = (severity: string): string => {
    switch (severity) {
      case 'high': return '🚨';
      case 'medium': return '⚠️';
      case 'low': return '⚡';
      default: return '📝';
    }
  };

  return (
    <QueryContainer>
      <SectionTitle>
        🔍 QUERY INCIDENTS
      </SectionTitle>

      <LocationSelector>
        <LocationLabel>📍 Select Location</LocationLabel>
        <LocationSelect
          value={selectedLocation?.name || ''}
          onChange={(e) => handleLocationChange(e.target.value)}
        >
          <option value="">Choose a location...</option>
          {PREDEFINED_LOCATIONS.map(location => (
            <option key={location.name} value={location.name}>
              {location.displayName}
            </option>
          ))}
        </LocationSelect>
        
        {selectedLocation && (
          <LocationInfo>
            <strong>Available Locations:</strong>
            <ul style={{ margin: '0.5rem 0', paddingLeft: '2rem' }}>
              {PREDEFINED_LOCATIONS.map(location => (
                <li key={location.name}>
                  {location.displayName} {location === selectedLocation && '← Selected'}
                </li>
              ))}
            </ul>
          </LocationInfo>
        )}
      </LocationSelector>

      {selectedLocation && (
        <>
          <FilterSection>
            <FilterTitle>🗂️ Filter Options</FilterTitle>
            <FilterRow>
              <FilterSelect
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="all">All Categories</option>
                <option value="pothole">Road Issues</option>
                <option value="streetlight">Street Lights</option>
                <option value="drainage">Drainage</option>
                <option value="traffic_signal">Traffic Signals</option>
                <option value="garbage">Garbage</option>
                <option value="water_supply">Water Supply</option>
              </FilterSelect>

              <FilterSelect
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="resolved">Resolved</option>
              </FilterSelect>

              <FilterSelect
                value={filters.severity}
                onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
              >
                <option value="all">All Severity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </FilterSelect>
            </FilterRow>
          </FilterSection>

          <IncidentsSection>
            <IncidentsTitle>
              📊 INCIDENTS IN {selectedLocation.displayName.toUpperCase()}
            </IncidentsTitle>

            {error && (
              <ErrorMessage>{error}</ErrorMessage>
            )}

            {loading ? (
              <LoadingState>
                <LoadingSpinner>⏳</LoadingSpinner>
                <div>Loading incidents for {selectedLocation.displayName}...</div>
              </LoadingState>
            ) : incidents.length === 0 ? (
              <EmptyState>
                <EmptyIcon>🔍</EmptyIcon>
                <div>No incidents found in {selectedLocation.displayName}</div>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
                  ✨ Great news! This area seems to be incident-free at the moment.
                  <br />
                  Try selecting a different location or adjusting the filters.
                </p>
              </EmptyState>
            ) : (
              incidents.map((incident, index) => (
                <IncidentCard key={incident.id || index}>
                  <IncidentHeader>
                    <IncidentTitle>
                      {getSeverityIcon(incident.severity)} {incident.title || `${incident.type} Issue`} - <SeverityBadge severity={incident.severity}>{incident.severity}</SeverityBadge>
                    </IncidentTitle>
                  </IncidentHeader>
                  <IncidentLocation>
                    📍 {incident.location?.address || 'Location not specified'}
                  </IncidentLocation>
                  <IncidentTime>
                    ⏰ {formatTimeAgo(incident.reportedAt)}
                  </IncidentTime>
                  {incident.description && (
                    <div style={{ marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
                      {incident.description.length > 100 
                        ? `${incident.description.substring(0, 100)}...` 
                        : incident.description}
                    </div>
                  )}
                </IncidentCard>
              ))
            )}
          </IncidentsSection>
        </>
      )}
    </QueryContainer>
  );
};

export default QuerySection;
