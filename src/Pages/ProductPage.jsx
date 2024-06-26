import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Cart from './Cart';
import { useDispatch } from 'react-redux';
import { addToCart } from '../Features/CartSlice';

const ProductPage = () => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [isCartVisible, setIsCartVisible] = useState(false);

  // const { cartItems, setCartItems } = useContext(CartContext);

  const location = useLocation();
  const dispatch = useDispatch();
  const { brand, name, price, image } = location.state; // Capturing Passed States From CARD
  
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  const handleBagClick = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    const newItem = {
      brand,
      name,
      price,
      image,
      size: selectedSize,
      quantity: 1,
    };
    dispatch(addToCart(newItem));
    setIsCartVisible(true);
  };
  

  return (
    <>
      <div className="container mx-auto p-4 mt-12">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full  md:w-1/2 p-4">
            <img src={image} alt="Product" className="w-full h-fit" />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h1 className="text-2xl font-bold">{brand}</h1>
            <h2 className="text-xl font-semibold mt-2">{name}</h2>
            <p className="text-lg font-medium mt-2">{price}</p>
            <p className="text-sm text-gray-400">MRP inclusive of all taxes</p>
            <p className="mt-4 text-gray-800">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt animi, cupiditate velit nisi cumque dolores
              numquam quos aperiam eum ipsum, maiores similique sed accusamus labore voluptatum veritatis dolorem rem. Illo
              soluta alias, unde assumenda laudantium quos facilis. Aperiam, a sunt et in laboriosam ex nisi!
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-800">
              <li>Loose fit</li>
              <li>Ribbed crewneck</li>
              <li>Front body: 100% recycled PET interlock</li>
              <li>Back body: 100% recycled PET tricot</li>
            </ul>
            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size ? 'bg-[#227be8] text-white' : 'bg-white text-gray-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button
                className="bg-[#0886DF] text-white p-1 rounded-md px-4 py-2 mr-2"
                onClick={handleBagClick}
              >
                ADD TO BAG
              </button>
            </div>
          </div>
        </div>
        {isCartVisible && 
        <Cart />}
      </div>
    </>
  );
};

export default ProductPage;
