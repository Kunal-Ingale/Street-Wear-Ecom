import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar.jsx";
import Hero from "../Components/Hero.jsx";
import CategoryProducts from "../Components/CategoryProducts.jsx";
import Footer from "../Components/Footer.jsx";

function Home() {
  const newArrivalsRef = useRef(null);
  const clothingRef = useRef(null);
  const sneakersRef = useRef(null);
  const accessoriesRef = useRef(null);
  const aboutRef = useRef(null);
   
  const user = useSelector((state) => state.auth.user);
  const checked = useSelector((state) => state.auth.checked);
  const navigate = useNavigate();
  
  if (!checked) {
    return null;
  }

  if (!user) {
    navigate('/login');
    return null;
  }
 
  return (
    <div>
      <Navbar aboutRef={aboutRef} />
      <Hero 
        newArrivalsRef={newArrivalsRef} 
        clothingRef={clothingRef} 
        sneakersRef={sneakersRef} 
        accessoriesRef={accessoriesRef} 
      />
      <div ref={newArrivalsRef}>
        <CategoryProducts category="New Arrival" />
      </div>
      <div ref={clothingRef}>
        <CategoryProducts category="Clothing" />
      </div>
      <div ref={sneakersRef}>
        <CategoryProducts category="Sneakers" />
      </div>
      <div ref={accessoriesRef}>
        <CategoryProducts category="Accessories" />
      </div>
      <div ref={aboutRef}>
        <Footer />
      </div>
    </div>
  );
}

export default Home;