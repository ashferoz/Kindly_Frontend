import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from '../contexts/user';

const ProtectedRoutes = () => {
  const { accessToken } = useContext(UserContext);

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
