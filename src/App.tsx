import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { LayoutPage } from './containers/LayoutPage/LayoutPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { LoginForm } from './components/LoginForm/LoginForm';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route path="login" element={<LoginForm />} />
        <Route path="registration" element={<RegistrationForm />} />
        {/* <Route index element={<Main />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
