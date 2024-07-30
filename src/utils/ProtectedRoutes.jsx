import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/user';

const ProtectedRoutes = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (!userCtx.accessToken) {
      navigate('/signin');
    }
  }, [userCtx.accessToken, navigate]);

  return <Outlet />;
};

export default ProtectedRoutes;
