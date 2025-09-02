import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './layouts/home/index';

import ProductRoutes from './layouts/products/index';
import { ProductProvider } from './context/ProductContext';

import UserRoutes from './layouts/users/index';
import { UserProvider } from './context/UserContext'

import { AuthProvider } from './context/AuthContext';
import LoginForm from './layouts/auth/LoginForm';
import RegisterForm from './layouts/auth/RegisterForm';

import './App.css';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import ForgotPassword from './layouts/auth/ForgotPassword';

import PrivateRoute from './utils/PrivateRoute';
import PublicRoute from './utils/PublicRoute'; // <- agregar
import ResetPassword from './layouts/auth/ResetPassword';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Fragment>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clave-olvidada" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* rutas publicas */}
            <Route
              path="/inicio-sesion"
              element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              }
            />
            <Route
              path="/registro"
              element={
                <PublicRoute>
                  <RegisterForm />
                </PublicRoute>
              }
            />

            {/* Rutas privadas */}
            <Route
              path="/productos/*"
              element={
                <PrivateRoute>
                  <ProductProvider>
                    <ProductRoutes />
                  </ProductProvider>
                </PrivateRoute>
              }
            />
            <Route
              path="/usuarios/*"
              element={
                <PrivateRoute>
                  <UserProvider>
                    <UserRoutes />
                  </UserProvider>
                </PrivateRoute>
              }
            />
          </Routes>
        </Fragment>
      </AuthProvider>
    </Router>
  );
}

export default App;
