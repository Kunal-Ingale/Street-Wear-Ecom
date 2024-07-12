// src/components/Logout.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../Features/AuthSlice';
import { Navigate, useNavigate } from 'react-router-dom';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async() => {
    await dispatch(logoutUser()).unwrap();
    navigate('/login');
    
  };

  return (
  <button 
  onClick={handleLogout} 
  className="text-black hover:text-[#0886DF] bg-white  rounded-md"
>
  Logout
</button>
  )
};

export default Logout;
