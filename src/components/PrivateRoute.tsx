import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/MockAuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { currentUser } = useAuth();
  
  return currentUser ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
