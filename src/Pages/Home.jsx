import React, { useRef } from 'react';
import Hero from "../Components/Hero.jsx";
import CategoryProducts from "../Components/CategoryProducts.jsx";
import Footer from "../Components/Footer.jsx";

function Home() {
  const newArrivalsRef = useRef(null);
  const clothingRef = useRef(null);
  const sneakersRef = useRef(null);
  const accessoriesRef = useRef(null);

  return (
    <div className="min-h-screen">
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
    </div>
  );
}

export default Home;