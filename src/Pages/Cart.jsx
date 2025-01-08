import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(true);
  const { authState } = useContext(AuthContext);
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const cleanedPrice = item.price.replace(/[^\d.]/g, '');
      const price = cleanedPrice.trim() === '' ? 0 : parseFloat(cleanedPrice);
      const quantity = parseInt(item.quantity, 10);
      return isNaN(price) || isNaN(quantity) ? total : total + price * quantity;
    }, 0).toFixed(2); // Added toFixed(2) for consistent decimal places
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handleUpdateQuantity = (itemId, delta) => {
    const currentItem = cartItems.find((item) => item.id === itemId);
    if (currentItem) {
      const newQuantity = currentItem.quantity + delta;
      if (newQuantity > 0) {
        updateQuantity(itemId, newQuantity);
      }
    }
  };

  const handleCheckout = () => {
    if (authState.user) {
      navigate('/Checkout');
    } else {
      navigate('/login', { 
        state: { redirectTo: '/Checkout' } 
      });
    }
  };

  return isCartOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div className="w-full md:w-1/3 bg-white h-full flex flex-col shadow-lg">
        {cartItems.length === 0 ? (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <Link to="/">
                <button className="text-xl hover:text-gray-700" onClick={closeCart}>
                  &#10005;
                </button>
              </Link>
            </div>
            <div className="flex-grow flex items-center justify-center">
              <div className="text-center text-xl text-gray-500">Your Bag is Empty</div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-bold">Shopping Cart</h2>
              <Link to="/">
                <button className="text-xl hover:text-gray-700" onClick={closeCart}>
                  &#10005;
                </button>
              </Link>
            </div>

            <div className="flex-grow overflow-y-auto p-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center border-b pb-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-grow ml-4">
                    <h3 className="font-bold">{item.brand}</h3>
                    <p className="text-gray-500">{item.name}</p>

                    <div className="flex items-center mt-2">
                      <button
                        className="px-2 py-1 border rounded-md hover:bg-gray-100"
                        onClick={() => handleUpdateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="mx-2 min-w-[20px] text-center">{item.quantity}</span>
                      <button
                        className="px-2 py-1 border rounded-md hover:bg-gray-100"
                        onClick={() => handleUpdateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                      <button
                        className="px-2 py-1 border rounded-md ml-4 text-red-500 hover:bg-red-50"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <p className="text-gray-500 mt-2">Price: ₹ {item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Subtotal</h3>
                <p className="text-lg font-bold">₹ {calculateSubtotal()}</p>
              </div>
              <button
                className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 transition-colors"
                onClick={handleCheckout}
              >
                CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  ) : null;
};

export default Cart;