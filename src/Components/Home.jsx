import Hero from "./Hero";
import Card from "./Card";
import { Product1 } from '../ProductList/Product1.jsx';
import { Product2 } from '../ProductList/Product2.jsx';
import { Product3 } from '../ProductList/Product3.jsx';
import { Product4 } from '../ProductList/Product4.jsx';
import { useRef } from "react";
import Footer from "./Footer.jsx";
import React from 'react';
import Navbar from "./Navbar.jsx";

function Home() {
  const newArrivalsRef = useRef(null);
  const clothingRef = useRef(null);
  const sneakersRef = useRef(null);
  const accessoriesRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div>
      <Navbar aboutRef={aboutRef} contactRef={contactRef} />
      <Hero newArrivalsRef={newArrivalsRef} 
        clothingRef={clothingRef} 
        sneakersRef={sneakersRef} 
        accessoriesRef={accessoriesRef} />
      <div ref={newArrivalsRef}><Card title="New Arrivals" products={Product1} /></div>
      <div ref={clothingRef}><Card title="Clothing" products={Product2} /></div>
      <div ref={sneakersRef}><Card title="Sneakers" products={Product3} /></div>
      <div ref={accessoriesRef}><Card title="Accessories" products={Product4} /></div>
      <div ref={aboutRef}><Footer /></div>
      
    </div>
  );
}

export default Home;
