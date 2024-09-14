import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
