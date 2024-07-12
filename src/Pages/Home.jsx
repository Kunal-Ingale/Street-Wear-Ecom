  import Hero from "../Components/Hero.jsx";
  import Card from "../Components/Card.jsx";
  import { Product1 } from '../ProductList/Product1.jsx';
  import { Product2 } from '../ProductList/Product2.jsx';
  import { Product3 } from '../ProductList/Product3.jsx';
  import { Product4 } from '../ProductList/Product4.jsx';
  import { useEffect, useRef, useState } from "react";
  import { useSelector } from 'react-redux';
  import Footer from "../Components/Footer.jsx";
  import React from 'react';
  import Navbar from "../Components/Navbar.jsx";
import { useNavigate } from "react-router-dom";


  function Home() {
    const newArrivalsRef = useRef(null);
    const clothingRef = useRef(null);
    const sneakersRef = useRef(null);
    const accessoriesRef = useRef(null);
    const aboutRef = useRef(null);
    const contactRef = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate()
  const checked = useSelector((state) => state.auth.checked); // Access checked state
  
  // If the authentication status is not yet determined, render nothing
  if (!checked) {
    return null;
  }

  // If the user is not authenticated, redirect to the login page
  if (!user) {
    navigate('/login');
  }
 
    return (
      <div>
        <Navbar aboutRef={aboutRef} contactRef={contactRef} />
        <Hero newArrivalsRef={newArrivalsRef} 
          clothingRef={clothingRef} 
          sneakersRef={sneakersRef} 
          accessoriesRef={accessoriesRef} />
        <div ref={newArrivalsRef}><Card title="New Arrivals" products={Product1} category="clothes" /></div>
        <div ref={clothingRef}><Card title="Clothing" products={Product2} category="clothes" /></div>
        <div ref={sneakersRef}><Card title="Sneakers" products={Product3} category="sneakers" /></div>
        <div ref={accessoriesRef}><Card title="Accessories" products={Product4} category="accessories" /></div>
        <div ref={aboutRef}><Footer /></div>
      </div>
    );
  }

  export default Home;
