import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../contexts/user';

const ProtectedRoutes = () => {
  const userCtx = useContext(UserContext);

  return userCtx.accessToken ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoutes;
