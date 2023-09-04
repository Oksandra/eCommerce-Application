import React from 'react';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import { LayoutPage } from './containers/LayoutPage/LayoutPage';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { LoginForm } from './components/LoginForm/LoginForm';
import RequireAuth from './hoc/RequireAuth';
import { AuthProvider } from './hoc/AuthProvider';
import AccessLimitAuth from './hoc/AccessLimitAuth';
import LogOutPage from './pages/LogOutPage/LogOutPage';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import HomePage from './pages/HomePage/HomePage';
import Profile from './components/Profile/Profile';
import ProductPage from './pages/ProductPage/ProductPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route
            path="login"
            element={
              <AccessLimitAuth>
                <LoginForm />
              </AccessLimitAuth>
            }
          />
          <Route
            path="registration"
            element={
              <AccessLimitAuth>
                <RegistrationForm />
              </AccessLimitAuth>
            }
          />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/:id" element={<ProductPage />} />
          <Route
            path="about"
            element={<div className="center-align">About Us!</div>}
          />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="logout"
            element={
              <RequireAuth>
                <LogOutPage />
              </RequireAuth>
            }
          />
          <Route
            path="favorites"
            element={
              <RequireAuth>
                <div className="center-align">My favorites products</div>
              </RequireAuth>
            }
          />
          <Route
            path="cart"
            element={<div className="center-align">My cart!</div>}
          />
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
