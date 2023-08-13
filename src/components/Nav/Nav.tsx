import React from 'react';
import './Nav.scss';
import { NavLink } from 'react-router-dom';

export const Nav: React.FC = () => {
  return (
    <nav className="nav">
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
          <NavLink className="nav__link" to="/login">
            LOG IN | SIGN UP
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
