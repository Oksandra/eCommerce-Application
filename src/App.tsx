import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { LayoutPage } from './containers/LayoutPage/LayoutPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        {/* <Route index element={<Main />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
