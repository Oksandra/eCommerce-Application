import React, { FC, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../Header/Header';
import { Footer } from '../Footer/Footer';

const transparentHeader: string[] = ['/'];

export const LayoutPage: FC = () => {
  const location = useLocation();
  const [isHeaderTransperent, setHeaderTransperent] = useState<boolean>(false);

  useEffect(() => {
    setHeaderTransperent(transparentHeader.includes(location.pathname));
  }, [location.pathname]);
  return (
    <>
      {!isHeaderTransperent && <Header value="header" />}
      {isHeaderTransperent && <Header value="header transperent" />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
