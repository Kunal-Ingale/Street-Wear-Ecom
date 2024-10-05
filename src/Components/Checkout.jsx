import React from 'react';
import { useSelector } from 'react-redux';
import CustDetails from '../Pages/CustDetails';

function Checkout() {
    const cartItems = useSelector((state) => state.cart.cartItems);
  
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

            <div className="flex flex-col md:flex-row">
                {/* Left Side: Cart Items */}
                <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-4">
                    <h2 className="text-2xl font-bold mb-4">Items in Cart</h2>
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cartItems.map((item, index) => (
                            <div key={index} className="flex items-center border-b pb-4 mb-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <div className="flex-grow ml-4">
                                    <h3 className="font-bold">{item.brand}</h3>
                                    <p className="text-gray-500">{item.name}</p>
                                    <p className="text-gray-500 mt-2">Price: ₹ {item.price}</p>
                                    <p className="text-gray-500 mt-2">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Right Side: Customer Details */}
                <div className="w-full md:w-1/2 pl-0 md:pl-4"> 
                    <CustDetails />
                </div>
            </div>
        </div>
    );
}

export default Checkout;
