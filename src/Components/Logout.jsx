import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const { logoutUser } = useContext(AuthContext); // Using context
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser(); // Call logoutUser function from context
      navigate('/login'); // Redirect to login page after successful logout
    } catch (err) {
      console.error('Logout failed:', err.message);
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="py-2 px-4 bg-red-500 text-white rounded-md">
        Logout
      </button>
    </div>
  );
};

export default Logout;
