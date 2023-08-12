import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/svg/logo.svg';
import user from '../../assets/svg/avatar.svg';
import heart from '../../assets/svg/heart.svg';
import cart from '../../assets/svg/shopping.svg';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="header__icons">
            <Link className="header__links" to="/login">
              <img src={user} alt="User" />
            </Link>
            <Link className="header__links" to="/favorites">
              <img src={heart} alt="Favorites" />
            </Link>
            <Link className="header__links" to="/cart">
              <img src={cart} alt="Cart" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
