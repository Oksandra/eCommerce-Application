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
            path="catalog"
            element={<div className="center-align">Here is the catalog!</div>}
          />
          <Route
            path="about"
            element={<div className="center-align">About Us!</div>}
          />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <div className="center-align">Profile Page!</div>
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
            element={<div className="center-align">Favorites products</div>}
          />
          <Route
            path="cart"
            element={<div className="center-align">My cart!</div>}
          />
          <Route
            index
            element={<div className="center-align">Home Page!</div>}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
