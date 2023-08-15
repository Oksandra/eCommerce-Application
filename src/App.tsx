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
        <Route path="catalog" element={<div>Here is the catalog!</div>} />
        <Route path="about" element={<div>About Us!</div>} />
        <Route path="profile" element={<div>Profile Page!</div>} />
        <Route path="favorites" element={<div>Favorites products</div>} />
        <Route path="cart" element={<div>My cart!</div>} />
        <Route index element={<div>Home Page!</div>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
