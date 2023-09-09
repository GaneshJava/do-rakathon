import React from 'react';
import { useSelector } from 'react-redux';
import { authState } from 'store';
import { Navigate, useLocation } from 'react-router-dom';
import AppLayout from '_DO-1.0/layout';

const PrivateRoutes = () => {
  const { isAuthenticated } = useSelector(authState);
  const location = useLocation();

  return isAuthenticated  ?  <AppLayout /> : <Navigate to="/login" state={{ from: location }} />;
  
};

export default PrivateRoutes;
