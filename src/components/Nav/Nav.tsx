import React, { useContext } from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { HeaderContext } from '../../containers/Header/HeaderContext';

export const Nav: React.FC = () => {
  const { user } = useAuth();
  const logLink = user ? '/logout' : '/login';
  const headerContext = useContext(HeaderContext) === 'true';

  return (
    <nav className={`nav ${headerContext ? 'nav_active' : ''}`}>
      <ul className="nav__list">
        <li className="nav__item">
          <NavLink className="nav__link" to="/">
            HOME
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link" to="/catalog">
            CATALOGUE
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link" to="/about">
            ABOUT US
          </NavLink>
        </li>
        <li className="nav__item">
          <NavLink className="nav__link" to={logLink}>
            {user ? 'LOG OUT' : 'LOG IN | SIGN UP'}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
