import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({
  children,
}: {
  children: React.ReactElement;
}): JSX.Element => {
  const auth = false;

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
