import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './layouts/home/index';

import ProductRoutes from './layouts/products/index'; 
import { ProductProvider } from './context/ProductContext'; 

import UserRoutes from './layouts/users/index'; 
import { UserProvider } from './context/UserContext'

import './App.css';
import 'primereact/resources/themes/lara-dark-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <Router>
      <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/productos/*"
            element={
              <ProductProvider>
                <ProductRoutes />
              </ProductProvider>
            }
          />
          <Route
            path="/usuarios/*"
            element={
              <UserProvider>
                <UserRoutes />
              </UserProvider>
            }
          />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App;
