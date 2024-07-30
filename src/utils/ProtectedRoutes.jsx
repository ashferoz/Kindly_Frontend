import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../contexts/user';

const ProtectedRoutes = () => {
  const userCtx = useContext(UserContext);

  if (!userCtx.accessToken) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
