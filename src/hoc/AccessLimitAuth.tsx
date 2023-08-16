import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const AccessLimitAuth = ({
  children,
}: {
  children: React.ReactElement;
}): JSX.Element => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AccessLimitAuth;
