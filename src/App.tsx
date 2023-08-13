import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { LayoutPage } from './containers/LayoutPage/LayoutPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { LoginForm } from './components/LoginForm/LoginForm';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route path="login" element={<LoginForm />} />
        {/* <Route index element={<Main />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
