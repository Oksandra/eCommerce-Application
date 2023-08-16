import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthProvider';

const RequireAuth = ({
  children,
}: {
  children: React.ReactElement;
}): JSX.Element => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
