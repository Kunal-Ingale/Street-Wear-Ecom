import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import Navbar from './Components/Navbar.jsx'
import Home from './Components/Home.jsx';
import ProductPage from './Pages/ProductPage.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './Components/ScrollToTop.jsx';
import Cart from './Pages/Cart.jsx';

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

 
  return (
    <>
      <Router>
       <Navbar/>
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductPage cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
