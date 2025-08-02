import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import { isAdmin, isAuthenticated } from '../services/auth'; 

const RedirectToProfile = (props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      if (authenticated) {
        navigate('/' + (await isAdmin() ? 'admin' : 'profile'));
      }
    };

    checkAuth();
  }, [navigate]);

  
  return <Home darkMode={props.darkMode}/>;
};

export default RedirectToProfile;

