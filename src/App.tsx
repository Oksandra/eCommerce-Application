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
import CartPage from './pages/CartPage/CartPage';
import { AboutUs } from './pages/AboutUs/AboutUs';
import { QuantityProvider } from './hoc/QuantityProvider';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';

function App(): JSX.Element {
  return (
    <AuthProvider>
      <QuantityProvider>
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
            <Route path="about" element={<AboutUs />} />
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
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route index element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </QuantityProvider>
    </AuthProvider>
  );
}

export default App;
