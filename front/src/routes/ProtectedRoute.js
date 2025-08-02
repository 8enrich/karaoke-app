import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../services/auth';

const ProtectedRoute = ({ component: Component, darkMode: darkMode, params: params, ...rest }) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false); 
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authStatus = await isAuthenticated(); 
      setIsAuthenticatedUser(authStatus);
      setIsAuthChecked(true); 
    };
    const checkAdmin = async () => {
      const admin = await isAdmin();
      setAdmin(admin);
      setIsAdminUser(true); 
    }

    checkAuth();
    checkAdmin();
  }, []);

  if (!isAuthChecked || !isAdminUser) {
    
    return <div>Loading...</div>;
  }
  
  return isAuthenticatedUser ? (
    <Component {...rest} admin={admin} darkMode={darkMode} component={params}/>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoute;
