import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LogOutPage.scss';
import { useAuth } from '../../hooks/useAuth';
import { QuantityContext } from '../../hoc/QuantityProvider';

const LogOutPage: React.FC = () => {
  const { signout } = useAuth();
  const { setCount } = useContext(QuantityContext);
  const navigate = useNavigate();
  return (
    <div className="logout">
      <p className="logout__title">Are you sure you want to leave?</p>
      <button
        className="logout__button"
        type="button"
        onClick={(): void => {
          signout(() => navigate('/', { replace: true }));
          localStorage.removeItem('userWin4ik');
          localStorage.removeItem('idCartWin4ik');
          localStorage.removeItem('tokenWin4ik');
          localStorage.removeItem('promocodeWin4ik');
          setCount(null);
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default LogOutPage;
