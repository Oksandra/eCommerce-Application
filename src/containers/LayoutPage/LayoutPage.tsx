import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

export const LayoutPage: FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      {/* TO DO: Add footer */}
    </>
  );
};
