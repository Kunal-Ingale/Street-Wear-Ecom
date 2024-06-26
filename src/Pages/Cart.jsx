import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { removeFromCart,updateQuantity } from '../Features/CartSlice';

const Cart = () => {
  // const { cartItems, setCartItems } = useContext(CartContext); // Ensure we have a way to update the context
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [quantities, setQuantities] = useState([]);

  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  
  useEffect(() => {
    // Initialize cart items from localStorage on component mount
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setQuantities(storedCartItems.map(item => ({ ...item, quantity: item.quantity || 1 })));
  }, []);

  useEffect(() => {
    // Sync quantities state with cartItems context and localStorage
    setQuantities(cartItems.map(item => ({ ...item, quantity: item.quantity || 1 })));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const closeCart = () => {
    setIsCartOpen(false);
  };

  // const updateQuantity = (index, delta) => {
  //   const updatedQuantities = [...quantities];
  //   const newQuantity = updatedQuantities[index].quantity + delta;
  //   if (newQuantity > 0) { // Ensure quantity does not go below 1
  //     updatedQuantities[index].quantity = newQuantity;
  //     setQuantities(updatedQuantities);

  //     // Update cartItems context and localStorage
  //     const updatedCartItems = [...cartItems];
  //     updatedCartItems[index].quantity = newQuantity;
  //     setCartItems(updatedCartItems);
  //     localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  //   }
  // };

  const calculateSubtotal = () => {
    return quantities.reduce((total, item) => {
      const cleanedPrice = item.price.replace(/[^\d.]/g, ''); // Remove non-numeric characters
      const price = cleanedPrice.trim() === '' ? 0 : parseFloat(cleanedPrice);
      const quantity = parseInt(item.quantity, 10); // Ensure quantity is an integer using radix 10
      console.log(`Item: ${item.name}, Price: ${price}, Quantity: ${quantity}`);
      return isNaN(price) || isNaN(quantity) ? total : total + price * quantity;
    }, 0);
  };

  // const removeItem = (index) => {
  //   const updatedQuantities = [...quantities];
  //   updatedQuantities.splice(index, 1);
  //   setQuantities(updatedQuantities);

  //   const updatedCartItems = cartItems.filter((_, i) => i !== index);
  //   setCartItems(updatedCartItems);
  //   localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  // };

  const handleRemove = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleUpdateQuantity = (index, delta) => {
    const newQuantity = cartItems[index].quantity + delta;
    if (newQuantity > 0) {
      dispatch(updateQuantity({ index, quantity: newQuantity }));
    }
  };

  return isCartOpen ? (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
        <div className="w-full md:w-1/3 bg-white h-full flex flex-col shadow-lg">
          {/* Cart Header */}
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

              {/* Cart Items */}
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
                          onClick={() => updateQuantity(index, -1)}
                          disabled={item.quantity <= 1} // Prevent quantity from going below 1
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

              {/* Cart Footer */}
              <div className="p-4 border-t">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Subtotal</h3>
                  <p className="text-lg font-bold">₹ {calculateSubtotal()}</p>
                </div>
                <button className="w-full bg-black text-white py-3 rounded-full">
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
