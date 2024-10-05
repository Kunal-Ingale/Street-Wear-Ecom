// src/components/Navbar.jsx

import React, { useState } from 'react';
import { IoBagHandleOutline } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../Features/AuthSlice';

const Navbar = ({ aboutRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      });
      setIsOpen(false);
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    try {
      dispatch(logoutUser());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white p-5 font-font2 text-lg h-16 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="w-56">
          <Link to={'/'}>
          <img src="Images/logo2.webp" alt="logo" />
          </Link>
        </div>
        <div className="md:hidden flex items-center space-x-4">
          <Link to="/cart" className="w-12 mb-1">
            <IoBagHandleOutline size={24} />
          </Link>
          <button onClick={toggleMenu} className="text-black w-6 justify-center">
            <img src="Images/humb.png" alt="Menu" />
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white p-4 shadow-md">
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-black hover:text-gray-600">
                  Home
                </Link>
              </li>
              <li>
                <button 
                onClick={() => scrollToSection(aboutRef)} 
                className="text-black hover:text-gray-600">
                  About
                </button>
              </li>
              {!user ? (
                <li>
                  <button onClick={handleLogin} className="text-black hover:text-gray-600">
                    Login
                  </button>
                </li>
              ) : (
                <li>
                  <button onClick={handleLogout} className="text-black hover:text-gray-600">
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
        {/* Mobile */}
        <div className="hidden md:flex space-x-12">
          <Link to="/" className="text-black hover:text-[#0886DF]">
            Home
          </Link>
          <button onClick={() => scrollToSection(aboutRef)} className="text-black hover:text-[#0886DF]">
            About
          </button>
          <Link to="/cart" className="w-12 mb-1">
            <IoBagHandleOutline size={24} />
          </Link>
          {!user ? (
            <button onClick={handleLogin} className="bg-[#0886DF] px-2 text-white hover:text-white rounded-md hover:shadow-lg">
              Login
            </button>
          ) : (
            <button onClick={handleLogout} className="bg-[#0886DF] px-2 text-white hover:text-white rounded-md hover:shadow-lg">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
