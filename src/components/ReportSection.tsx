import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { api } from '../services/api';
import type { ReportFormData } from '../types';

const ReportContainer = styled.div`
  max-width: 800px;
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

const ReportForm = styled.form`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border: 1px solid #e1e5e9;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
  font-size: 1rem;
`;

const Select = styled.select`
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

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const LocationGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: end;
`;

const LocationInput = styled(Input)`
  flex: 1;
`;

const LocationButton = styled.button`
  padding: 1rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s;

  &:hover {
    background: #5a6fd8;
  }
`;

// SeverityGroup styling moved inline to RadioGroup

const RadioGroup = styled.div`
  display: flex;
  gap: 2rem;
`;

const RadioItem = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
`;

const RadioInput = styled.input`
  margin: 0;
`;

const ImageUpload = styled.div`
  border: 2px dashed #e1e5e9;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.2s;

  &:hover {
    border-color: #667eea;
  }
`;

const ImageInput = styled.input`
  display: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;

  &:hover {
    background: #5a6fd8;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  border: 1px solid #c3e6cb;
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

const ReportSection: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReportFormData>();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        },
        (error) => {
          console.error('Error getting location:', error);
          setCurrentLocation('Location access denied');
        }
      );
    } else {
      setCurrentLocation('Geolocation not supported');
    }
  };

  const onSubmit = async (data: ReportFormData) => {
    try {
      setLoading(true);
      setError('');
      setSuccess(false);

      // For demo purposes, use current location or default coordinates
      const reportData = {
        type: data.type,
        description: data.description,
        latitude: 12.9716, // Default to MG Road coordinates
        longitude: 77.5946,
        severity: data.severity,
        images: [] // Images will be handled separately
      };

      await api.submitReport(reportData);
      
      setSuccess(true);
      reset();
      setCurrentLocation('');
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
      
    } catch (error: any) {
      console.error('Report submission error:', error);
      setError('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ReportContainer>
      <SectionTitle>
        📝 REPORT INCIDENT
      </SectionTitle>

      {success && (
        <SuccessMessage>
          ✅ Your incident report has been successfully submitted! Report ID: #KHB-2024-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}
        </SuccessMessage>
      )}

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      <ReportForm onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>🏷️ Incident Type</Label>
          <Select {...register('type', { required: 'Please select an incident type' })}>
            <option value="">Select incident type</option>
            <option value="pothole">Road Issue - Pothole</option>
            <option value="streetlight">Street Light Out</option>
            <option value="drainage">Drainage Problem</option>
            <option value="traffic_signal">Traffic Signal Issue</option>
            <option value="garbage">Garbage Collection</option>
            <option value="water_supply">Water Supply Issue</option>
            <option value="other">Other</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>📍 Location</Label>
          <LocationGroup>
            <LocationInput
              type="text"
              placeholder="Current location or address"
              value={currentLocation}
              onChange={(e) => setCurrentLocation(e.target.value)}
            />
            <LocationButton type="button" onClick={getCurrentLocation}>
              📍 Get Current
            </LocationButton>
          </LocationGroup>
        </FormGroup>

        <FormGroup>
          <Label>📝 Description</Label>
          <TextArea
            {...register('description', { 
              required: 'Please provide a description',
              minLength: { value: 10, message: 'Description must be at least 10 characters' }
            })}
            placeholder="Describe the incident in detail..."
          />
          {errors.description && (
            <ErrorMessage>{errors.description.message}</ErrorMessage>
          )}
        </FormGroup>

        <FormGroup>
          <Label>⚡ Severity Level</Label>
          <RadioGroup>
            <RadioItem>
              <RadioInput
                type="radio"
                value="low"
                {...register('severity', { required: 'Please select severity level' })}
              />
              Low
            </RadioItem>
            <RadioItem>
              <RadioInput
                type="radio"
                value="medium"
                {...register('severity', { required: 'Please select severity level' })}
              />
              Medium
            </RadioItem>
            <RadioItem>
              <RadioInput
                type="radio"
                value="high"
                {...register('severity', { required: 'Please select severity level' })}
              />
              High
            </RadioItem>
          </RadioGroup>
        </FormGroup>

        <FormGroup>
          <Label>📷 Add Photos (Optional)</Label>
          <ImageUpload>
            <ImageInput
              type="file"
              id="images"
              accept="image/*"
              multiple
              {...register('images')}
            />
            <label htmlFor="images">
              📷 Click to add images<br />
              <small>Supports multiple images</small>
            </label>
          </ImageUpload>
        </FormGroup>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Submitting...' : '🚀 SUBMIT REPORT'}
        </SubmitButton>
      </ReportForm>
    </ReportContainer>
  );
};

export default ReportSection;
