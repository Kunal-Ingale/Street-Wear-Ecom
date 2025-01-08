import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Cart from './Cart';
import { CartContext } from '../context/CartContext';

const ProductPage = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);
  const { addToCart } = useContext(CartContext);
  const location = useLocation();
  const { brand, name, price, image, category } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.state, category]);

  const handleAddToBag = () => {
    const newItem = {
      brand,
      name,
      price,
      image,
      quantity: 1,
    };
    
    addToCart(newItem);
    setIsCartVisible(true);
  };

  if (!location.state) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="container mx-auto p-4 mt-12">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-1/2 p-4">
            <img src={image} alt={name} className="w-full h-fit object-cover" />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-2xl font-bold">{brand}</h1>
            <h2 className="text-xl font-semibold mt-2">{name}</h2>
            <p className="text-lg font-medium mt-2">{price}</p>
            <p className="text-sm text-gray-400">MRP inclusive of all taxes</p>
            <p className="mt-4 text-gray-800">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt animi, 
              cupiditate velit nisi cumque dolores numquam quos aperiam eum ipsum.
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-800">
              <li>Loose fit</li>
              <li>Ribbed crewneck</li>
              <li>Front body: 100% recycled PET interlock</li>
              <li>Back body: 100% recycled PET tricot</li>
            </ul>
            <button
              className="bg-[#0886DF] text-white p-1 rounded-md px-4 py-2 mr-2 mt-4 hover:bg-[#0672c0] transition-colors"
              onClick={handleAddToBag}
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      </div>
      {isCartVisible && <Cart onClose={() => setIsCartVisible(false)} />}
    </>
  );
};

export default ProductPage;