import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../Features/CartSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = () => {
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [quantities, setQuantities] = useState([]);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setQuantities(storedCartItems.map(item => ({ ...item, quantity: item.quantity || 1 })));
  }, []);

  useEffect(() => {
    setQuantities(cartItems.map(item => ({ ...item, quantity: item.quantity || 1 })));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const calculateSubtotal = () => {
    return quantities.reduce((total, item) => {
      const cleanedPrice = item.price.replace(/[^\d.]/g, '');
      const price = cleanedPrice.trim() === '' ? 0 : parseFloat(cleanedPrice);
      const quantity = parseInt(item.quantity, 10);
      return isNaN(price) || isNaN(quantity) ? total : total + price * quantity;
    }, 0);
  };

  const handleRemove = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleUpdateQuantity = (index, delta) => {
    const newQuantity = cartItems[index].quantity + delta;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ index, quantity: newQuantity }));
    }
  };

  const handleCheckout = () => {
    toast.success("Order placed successfully!");
    // Additional checkout logic can be added here
  };

  return isCartOpen ? (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
        <div className="w-full md:w-1/3 bg-white h-full flex flex-col shadow-lg">
          {quantities.length === 0 ? (
            <div>
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <Link to="/">
                  <button className="text-xl" onClick={closeCart}>
                    &#10005;
                  </button>
                </Link>
              </div>
              <div className="text-center text-xl">Your Bag is Empty</div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <Link to="/">
                  <button className="text-xl" onClick={closeCart}>
                    &#10005;
                  </button>
                </Link>
              </div>

              <div className="flex-grow overflow-y-auto p-4">
                {quantities.map((item, index) => (
                  <div key={index} className="flex items-center border-b pb-4 mb-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-grow ml-4">
                      <h3 className="font-bold">{item.brand}</h3>
                      <p className="text-gray-500">{item.name}</p>
                      <p className="text-gray-500">Size: {item.size}</p>
                      <div className="flex items-center mt-2">
                        <button
                          className="px-2 py-1 border rounded-md"
                          onClick={() => handleUpdateQuantity(index, -1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="px-2 py-1 border rounded-md"
                          onClick={() => handleUpdateQuantity(index, 1)}
                        >
                          +
                        </button>
                        <button
                          className="px-2 py-1 border rounded-md ml-4 text-red-500"
                          onClick={() => handleRemove(index)}
                        >
                          Remove
                        </button>
                      </div>
                      <p className="text-gray-500 mt-2">Price: ₹ {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Subtotal</h3>
                  <p className="text-lg font-bold">₹ {calculateSubtotal()}</p>
                </div>
                <button 
                  className="w-full bg-black text-white py-3 rounded-full"
                  onClick={handleCheckout}
                >
                  CHECKOUT
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  ) : null;
};

export default Cart;
