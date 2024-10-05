import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Cart from './Cart';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart, updateQuantity} from '../Features/CartSlice';


const ProductPage = () => {
  const [isCartVisible, setIsCartVisible] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();

  const cartItems = useSelector(state => state.cart.cartItems);
  const { brand, name, price, image, category } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.state, category]);

  const handleBagClick = () => {
    const newItem = {
      brand,
      name,
      price,
      image,
      quantity: 1,
    };
  
    const existingItem = cartItems.find(
      cartItem => cartItem.name === newItem.name && cartItem.brand === newItem.brand
    );
  
    if (existingItem) {
      // If item exists, increase its quantity
      dispatch(updateQuantity({
        index: cartItems.indexOf(existingItem),
        quantity: existingItem.quantity + 1,
      }));
    } else {
      // If item does not exist, add it to the cart
      dispatch(addToCart(newItem));
    }
  
    setIsCartVisible(true);
  };

  return (
    <>
      <div className="container mx-auto p-4 mt-12">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="w-full md:w-1/2 p-4">
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
            <button
              className="bg-[#0886DF] text-white p-1 rounded-md px-4 py-2 mr-2 mt-4"
              onClick={handleBagClick}
            >
              ADD TO BAG
            </button>
          </div>
        </div>
        {isCartVisible && <Cart />}
      </div>
    </>
  );
};

export default ProductPage;
