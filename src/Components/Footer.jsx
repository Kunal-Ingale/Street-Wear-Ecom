import React from 'react';
import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube, FaPinterest } from 'react-icons/fa';

const Footer = ({ footerRef }) => {
  return (
    <footer className="bg-gray-900 text-white pt-16" ref={footerRef}>
      <div className="container mx-auto px-4 flex flex-wrap justify-between font-font2">
        <div className="w-full md:w-2/5 mb-8 md:mb-0">
          <div className='w-64'>
            <img src="Images/logo2.webp" alt="logo" />
          </div>
          <div className="flex mt-12 space-x-8 ml-1">
            <a href="#" className="text-white hover:text-[#4aa0fb]"><FaTwitter size={24} /></a>
            <a href="#" className="text-white hover:text-[#4aa0fb]"><FaInstagram size={24} /></a>
            <a href="#" className="text-white hover:text-[#4aa0fb]"><FaFacebookF size={24} /></a>
            <a href="#" className="text-white hover:text-[#4aa0fb]"><FaYoutube size={24} /></a>
            <a href="#" className="text-white hover:text-[#4aa0fb]"><FaPinterest size={24} /></a>
          </div>
        </div>
        
        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-4 text-[#4aa0fb]">Support</h2>
          <ul>
            <li className="mb-2">
              <a href="#" className="text-white hover:underline">Contact Us</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-white hover:underline">FAQs</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-white hover:underline">Track Order</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-white hover:underline">Exchange & Return Policy</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-white hover:underline">Shoe Care</a>
            </li>
          </ul>
        </div>

        <div className="w-full md:w-1/5">
          <h2 className="text-2xl font-bold mb-4 text-[#4aa0fb]">Company</h2>
          <ul>
            <li className="mb-2">
              <a href="#" className="text-white hover:underline">About Us</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-white hover:underline">Careers</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-white hover:underline">Privacy Policy</a>
            </li>
            <li className="mb-2">
              <a href="#" className="text-white hover:underline">Terms & Conditions</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <p className="text-center text-white text-sm">
          &copy; 2023 Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
