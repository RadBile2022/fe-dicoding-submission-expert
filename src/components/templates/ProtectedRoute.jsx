import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

function ProtectedRoute() {
  const authUser = useSelector((state) => state.auth.user);
  const isPreload = useSelector((state) => state.auth.isPreload);
  const location = useLocation();

  if (isPreload) {
    return <div className="empty-state">Memeriksa sesi...</div>;
  }

  if (!authUser) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
