import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const LayoutPage: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};