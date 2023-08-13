import React, { FC } from 'react';
import './Footer.scss';
import logo from '../../assets/svg/logo.svg';

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <img src={logo} alt="logo" className="footer__logo" />
      <a
        className="footer__team"
        href="https://tapy.me/codedawin4ik"
        target="_blank"
        rel="noreferrer"
      >
        © CODE DA WIN4IK
      </a>
      <span className="footer__year">2023</span>
    </footer>
  );
};
