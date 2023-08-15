import React from 'react';
import './App.scss';
/* import { Route, Routes } from 'react-router-dom';
import { LayoutPage } from './containers/LayoutPage/LayoutPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'; */
import RegistrationForm from './components/RegistrationForm/RegistrationForm';

function App(): JSX.Element {
  /* return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        {/* <Route index element={<Main />} /> */ /* }
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  ); */
  return <RegistrationForm />;
}

export default App;
