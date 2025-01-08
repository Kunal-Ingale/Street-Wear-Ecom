import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import Navbar from './Components/Navbar.jsx';
import Home from './Pages/Home.jsx';
import ProductPage from './Pages/ProductPage.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cart from './Pages/Cart.jsx';
import Register from './Components/Register';
import Login from './Components/Login';
import Logout from './Components/Logout';
import { AuthContext } from './context/AuthContext';
import Checkout from './Components/Checkout.jsx';

function App() {
  const { authState } = useContext(AuthContext);
  const { user, checked, loading } = authState;

  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  if (!checked || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar cartItems={cartItems} />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/register" 
              element={!user ? <Register /> : <Navigate to="/" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />

            {/* Protected Routes */}
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/product/:id" 
              element={user ? <ProductPage setCartItems={setCartItems} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/cart" 
              element={user ? <Cart cartItems={cartItems} setCartItems={setCartItems} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/checkout" 
              element={user ? <Checkout cartItems={cartItems} setCartItems={setCartItems} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/logout" 
              element={user ? <Logout /> : <Navigate to="/login" />} 
            />

            {/* Fallback route */}
            <Route 
              path="*" 
              element={<Navigate to={user ? "/" : "/login"} replace />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;