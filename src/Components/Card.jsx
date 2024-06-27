import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, products, category, imageHeight = 'h-76' }) => {
  const scrollRef = useRef(null);
  
  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate(`/product/${product.id}`, {
      state: {
        brand: product.brand,
        name: product.name,
        price: product.price,
        image: product.image,
        category: category
      }
    });
  };

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="container mx-auto px-4 py-8 relative cursor-pointer">
      <h2 className="text-3xl font-bold mb-2 font-font2">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 custom-scrollbar pb-2" ref={scrollRef}>
        {products.map((product) => (
          <div 
            key={product.id} 
            className="min-w-[300px] flex-shrink-0 bg-white p-4 rounded-lg shadow-bottom-right relative"
            onClick={() => handleClick(product)}>
            <img
              src={product.image}
              alt={product.name}
              className={`w-64 ${imageHeight} max-h-72 object-cover mb-4`}
            />
            <div className="flex items-center justify-between mb-4">
              <div className="text-lg font-medium">{product.brand}</div>
            </div>
            <div className="text-sm text-gray-500 mb-2">{product.name}</div>
            <div className="text-sm text-gray-500 mb-2">{product.colors}</div>
            <div className="text-xl font-bold mt-2">{product.price}</div>
          </div>
        ))}
      </div>
      <button
        onClick={() => scroll(-300)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md"
      >
        &#8249;
      </button>
      <button
        onClick={() => scroll(300)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Card;
