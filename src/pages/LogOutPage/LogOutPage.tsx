import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogOutPage.scss';
import { AuthContext } from '../../hoc/AuthProvider';

const LogOutPage: React.FC = () => {
  const { signout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="logout">
      <p className="logout__title">Are you sure you want to leave?</p>
      <button
        className="logout__button"
        type="button"
        onClick={(): void => signout(() => navigate('/', { replace: true }))}
      >
        Log Out
      </button>
    </div>
  );
};

export default LogOutPage;
