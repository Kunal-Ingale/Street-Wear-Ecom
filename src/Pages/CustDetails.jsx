import React, { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { db } from '../Firebase/firebase';
import { useNavigate } from 'react-router-dom';


function CustDetails() {

    const [customerData, setCustomerData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        state: '',
    });
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({
            ...customerData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const orderData = {
            customer: customerData,
            products: cartItems,
            createdAt: new Date(),
        };

        try {
            // Add a new document with a generated ID in the 'orders' collection
            await addDoc(collection(db, 'orders'), orderData);
            alert('Order placed successfully!'); 
            setTimeout(() => {
               
                navigate('/'); // Adjust this route according to your Home page route
            }, 2000);
           
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('Order placed successfully!'); 

        }
    };
      
  return (
    <>
   <form onSubmit={handleSubmit}  className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
     <h2 className="text-2xl font-bold mb-6 text-center">Customer Details</h2>

     <div className="mb-4">
     <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
     <input type="text" id='name' name='name' value={customerData.name} onChange={handleChange}
     required  className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm" />
     </div>

     <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={customerData.email}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
    </div>
    <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={customerData.phone}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={customerData.address}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={customerData.city}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
        <input
          type="text"
          id="postalCode"
          name="postalCode"
          value={customerData.postalCode}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
        <input
          type="text"
          id="state"
          name="state"
          value={customerData.state}
          onChange={handleChange}
          required
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Submit
      </button>
   </form>
   
    </>
  )
}

export default CustDetails
