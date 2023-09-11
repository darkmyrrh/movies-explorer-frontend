import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRouteElement({ element, loggedIn }) {
  return loggedIn ? element : <Navigate to="/login" replace />;
}

export default ProtectedRouteElement;