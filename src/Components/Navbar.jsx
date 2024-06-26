import React, { useState } from 'react';
import { IoBagHandleOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Navbar = ({ aboutRef}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth'
      });
      setIsOpen(false); // Close the mobile menu after navigating
    }
  };

  return (
    <nav className="bg-white p-5 font-font2 text-lg h-16 fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className='w-56'>
          <img src="Images/logo2.webp" alt="logo" />
        </div>

        {/* Cart Icon (Visible on Small Screens) */}
        <div className="md:hidden flex items-center space-x-4">
          <Link to="/cart" className="w-12 mb-1">
            <IoBagHandleOutline size={24} />
          </Link>
          {/* Hamburger Icon */}
          <button 
            onClick={toggleMenu}
            className="text-black w-6 justify-center"
          >
            <img src="Images/humb.png" alt="Menu" />
          </button>
        </div>

        {/* Mobile Menu (Conditional Rendering) */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white p-4 shadow-md">
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-black hover:text-gray-600">Home</a>
              </li>
              <li>
                <button onClick={() => scrollToSection(aboutRef)} className="text-black hover:text-gray-600">About</button>
              </li>
              <li>
                <button onClick={() => scrollToSection(contactRef)} className="text-black hover:text-gray-600">Contact</button>
              </li>
            </ul>
          </div>
        )}

        {/* Menu Items (Visible on Medium and Larger Screens) */}
        <div className="hidden md:flex space-x-12">
          <a href="/" className="text-black hover:text-[#0886DF]">Home</a>
          <button onClick={() => scrollToSection(aboutRef)} className="text-black hover:text-[#0886DF]">About</button>
          {/* <button onClick={() => scrollToSection(contactRef)} className="text-black hover:text-[#0886DF]">Contact</button> */}
          <Link to="/cart" className="w-12 mb-1">
            <IoBagHandleOutline size={24} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
