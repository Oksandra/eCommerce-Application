import React, { useState } from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/svg/logo.svg';
import userSvg from '../../assets/svg/avatar.svg';
import heart from '../../assets/svg/heart.svg';
import cart from '../../assets/svg/shopping.svg';
import { Nav } from '../../components/Nav/Nav';
import { HeaderContext } from './HeaderContext';
import { Burger } from '../../components/Burger/Burger';
import { useAuth } from '../../hooks/useAuth';

interface HeaderProps {
  value: string;
}

const Header: React.FC<HeaderProps> = ({ value }) => {
  const { user } = useAuth();
  const [screenWidth, setScreenWidth] = useState<number>(
    window.screen.availWidth
  );
  window.addEventListener('resize', () => {
    setScreenWidth(window.screen.availWidth);
  });
  const [isBurgerActive, setIsBurgerActive] = useState<boolean>(false);
  return (
    <HeaderContext.Provider value={String(isBurgerActive)}>
      <header className={value}>
        <div className="header__wrapper">
          <div className="header__logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
            <div className="header__icons">
              {user ? (
                <Link className="header__links" to="/profile">
                  <img src={userSvg} alt="User" />
                </Link>
              ) : (
                ''
              )}
              <Link className="header__links" to="/favorites">
                <img src={heart} alt="Favorites" />
              </Link>
              <Link className="header__links" to="/cart">
                <img src={cart} alt="Cart" />
              </Link>
              {screenWidth < 455 && <Burger state={setIsBurgerActive} />}
            </div>
          </div>
          <Nav />
        </div>
      </header>
    </HeaderContext.Provider>
  );
};

export default Header;
