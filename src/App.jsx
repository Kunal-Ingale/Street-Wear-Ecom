import React, { useState, useEffect } from 'react';
import './index.css';
import Navbar from './Components/Navbar.jsx';
import Home from './Pages/Home.jsx';
import ProductPage from './Pages/ProductPage.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cart from './Pages/Cart.jsx';
import Register from './Components/Register';
import Login from './Components/Login';
import Logout from './Components/Logout';
import { useDispatch } from 'react-redux';
import { checkAuthState } from './Features/AuthSlice'; // Import checkAuthState action
import { useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch(); 
  const loggedIn = useSelector((state) => state.auth.user);


  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });


  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    dispatch(checkAuthState()); // Dispatch checkAuthState action on component mount
  }, [dispatch]);

 
  return (
    <Router>
       <Navbar  />      
      <Routes>
        {!loggedIn ? (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/logout" element={<Logout  />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
