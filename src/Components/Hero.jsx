import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FiArrowUpRight } from "react-icons/fi";

const Hero = ({newArrivalsRef, clothingRef, sneakersRef, accessoriesRef}) => {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const images = [
    "Images/H1f.jpg",
    "Images/H2.jpg",
    "Images/3.jpg",
    "Images/poster2.jpeg",
    "Images/H3.jpg",
    "Images/H4.jpg"
  ];

  const scrollToSection = (ref) => {
    const offset = 100;
    window.scrollTo({
      top: ref.current.offsetTop - offset,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col md:flex-row bg-white p-5 m-2 mt-16 shadow-md border rounded-lg relative overflow-hidden h-screen">
      {/* Left Column */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 md:space-y-6 ml-8">
        <div className="text-2xl ml-16 md:text-5xl font-bold font-font1 mb-1"
         style={{ lineHeight: '0' }}>Wear it with</div>
        <div className="text-3xl md:text-6xl text-[#6f6d6dc8] font-bold font-font1"
         style={{ lineHeight: '1' }}>
          Style & Comfort
        </div>
        <div className='font-font3 '>
        <div 
          className="text-gray-500 text-3xl md:text-4xl font-bold mb-4 transition duration-300 transform hover:scale-110 hover:text-[#086cdf] flex items-center after-line mt-8"
          onClick={() => scrollToSection(newArrivalsRef)}>
          <span className='cursor-pointer'>New Arrivals</span>
          <FiArrowUpRight className="ml-2" />
        </div>
        <div 
          className="text-gray-500 text-3xl md:text-4xl font-bold mb-4 transition duration-300 transform hover:scale-110 hover:text-[#086cdf] flex items-center after-line"
          onClick={() => scrollToSection(clothingRef)}>
          <span className='cursor-pointer'>Clothing</span>
          <FiArrowUpRight className="ml-2" />
        </div>
        <div 
          className="text-gray-500 text-3xl md:text-4xl font-bold mb-4 transition duration-300 transform hover:scale-110 hover:text-[#086cdf] flex items-center after-line "
          onClick={() => scrollToSection(sneakersRef)}>
          <span className='cursor-pointer'>Sneakers</span>
          <FiArrowUpRight className="ml-2" />
        </div>
        <div 
          className="text-gray-500 text-3xl md:text-4xl font-bold mb-4 transition duration-300 transform hover:scale-110 hover:text-[#086cdf] flex items-center after-line "
          onClick={() => scrollToSection(accessoriesRef)}>
          <span className='cursor-pointer'>Accessories</span>
          <FiArrowUpRight className="ml-2" />
        </div>
        </div>
            </div>
            <div className="md:w-1/2 w-full overflow-hidden h-full rounded-lg">
        <Slider {...settings}>
          {images.map((src, index) => (
            <div key={index} className="w-full h-full">
              <img src={src} alt={`slide-${index}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </Slider>
      </div>
        </div>
     
      
      
   
  );
};

export default Hero;