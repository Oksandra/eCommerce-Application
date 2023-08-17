import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LogOutPage.scss';
import { useAuth } from '../../hooks/useAuth';

const LogOutPage: React.FC = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="logout">
      <p className="logout__title">Are you sure you want to leave?</p>
      <button
        className="logout__button"
        type="button"
        onClick={(): void => {
          signout(() => navigate('/', { replace: true }));
          localStorage.removeItem('user');
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default LogOutPage;
