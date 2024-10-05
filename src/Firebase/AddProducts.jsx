import React from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from './firebase';  // Import Firestore instance

const AddProducts = () => {
  const addProductsToFirestore = async () => {
    const products = [
      {
        id: 1,
        name: 'JAY WALKING',
        category:"New Arrival",
        brand: 'JAY WALKING',
        price: '₹ 9,995.00',
        image: '/Images/t1.jpeg',
        colors: 'Black/White-White-Wolf Gray',
      },
      {
        id: 2,
        name: 'BLAZER LOW PRO CLUB',
        category:"New Arrival",
        brand: 'MNST',
        price: '₹ 8,695.00',
        image: '/Images/s1.jpeg',
        colors: 'WHITE/BLACK-BEACH-SUMMIT WHITE',
      },
      {
        id: 8,
        name: 'MEN HOODIE',
        category:"New Arrival",
        brand: 'H&M',
        price: '₹ 8,495.00',
        image: '/Images/hd1.jpeg',
        colors: 'WHITE/BLACK-SUMMIT WHITE-IRON GREY',
      },
      {
        id: 7,
        name: 'OVERSIZED TEE',
        category:"New Arrival",
        brand: 'Jordan',
        price: '₹ 2,295.00',
        image: '/Images/t2.jpeg',
        colors: 'Off white/Navy Blue',
      },
      {
        id: 6,
        name: 'OVERSIZED HOODIE',
        category:"New Arrival",
        brand: 'Jordan',
        price: '₹ 2,295.00',
        image: '/Images/hd2.jpeg',
        colors: 'OFF NOIR/SAIL',
      },
      {
        id: 5,
        name: 'MEN\'S T-SHIRT',
        category:"New Arrival",
        brand: 'Jordan',
        price: '₹ 2,295.00',
        image: '/Images/t3.jpeg',
        colors: 'OFF NOIR/SAIL',
      },
      {
        id: 3,
        name: 'Air Jordan 1 Low',
        category:"New Arrival",
        brand: 'Nike',
        price: '₹ 8 295.00',
        image: '/Images/Sneakers/aj1.jpg',
        colors: 'OFF NOIR/SAIL',
      },
      {
        id: 4,
        name: 'Luka 2 PF',
        category:"New Arrival",       
        brand: 'Nike',
        price: '₹ 11 297.00',
        image: '/Images/Sneakers/luka.png',
        colors: 'BLACK/WHITE/ORANGE',
      },
      //2nd
      {
        id: 9,
        name: 'STREET VOGUE',
        category:"Clothing",
        brand: 'STREET VOGUE',
        price: '₹ 5,995.00',
        image: '/Images/Cloth/1.jpeg',
        colors: 'Green/White',
      },
      {
        id: 10,
        name: 'BLAZER LOW PRO CLUB',
        category:"Clothing",
        brand: 'MNST',
        price: '₹ 9,695.00',
        image: '/Images/Cloth/9.jpeg',
        colors: 'WHITE/BLACK-BEACH-SUMMIT WHITE',
      },
      {
        id: 11,
        name: 'MEN GAMMA FORCE',
        category:"Clothing",
        brand: 'H&M',
        price: '₹ 5,495.00',
        image: '/Images/Cloth/3.jpeg',
        colors: 'Black/gray',
      },
      {
        id: 12,
        name: 'Oversized Tee',
        category:"Clothing",
        brand: 'MARTINAROSE',
        price: '₹ 2,295.00',
        image: '/Images/Cloth/6.jpeg',
        colors: 'Black/ Off-White',
      },
      {
        id: 13,
        name: 'Oversized Sweatshirt',
        category:"Clothing",
        brand: 'SUPREME',
        price: '₹ 2,295.00',
        image: '/Images/Cloth/4.jpeg',
        colors: 'OFF NOIR/SAIL',
      },
      {
        id: 14,
        name: ' T-SHIRT',
        category:"Clothing",
        brand: 'H&M',
        price: '₹ 2,295.00',
        image: '/Images/Cloth/7.jpeg',
        colors: 'Black/ Off-White',
      },
      {
        id: 15,
        name: 'Tees',
        category:"Clothing",
        brand: 'EE',
        price: '₹ 2,295.00',
        image: '/Images/Cloth/2.jpeg',
        colors: 'OFF NOIR/SAIL',
      },
      {
        id: 16,
        name: 'Hoodie',
        category:"Clothing",
        brand: 'SW',
        price: '₹ 6,495.00',
        image: '/Images/Cloth/8.jpeg',
        colors: 'OFF NOIR/SAIL',
      },
      {
        id: 17,
        name: 'Hoodie',                 
        category:"Clothing",
        brand: 'SW',
        price: '₹ 6,495.00',
        image: '/Images/Cloth/10.jpg',
        colors: 'OFF NOIR/SAIL',
      },
      //sneakers
      {
        id: 18,
        name: 'Jorden BRed',
         category:"Sneakers",
        brand: 'NIKE',
        price: '₹ 12,995.00',
        image: '/Images/Sneakers/1.jpeg',
        colors: 'Black-Red/Blue',
      },
      {
        id: 19,
        name: 'NB 550',
         category:"Sneakers",
        brand: 'NB',
        price: '₹ 15,995.00',
        image: '/Images/Sneakers/2.jpeg',
        colors: 'Green/White/Blue',
      },
      {
        id: 20,
        name: 'Samba',
        category:"Sneakers",
        brand: 'ADIDAS',
        price: '₹ 12,995.00',
        image: '/Images/Sneakers/4.jpeg',
        colors: 'Black-Red/Blue',
      },
      {
        id: 21,
        name: 'Air Jorden 1',
        category:"Sneakers",
        brand: 'NIKE',
        price: '₹ 12,995.00',
        image: '/Images/Sneakers/6.jpeg',
        colors: 'Ash Gray',
      },
      {
        id: 22,
        name: 'Air Max 90',
        category:"Sneakers",
        brand: 'NIKE',
        price: '₹ 20,995.00',
        image: '/Images/Sneakers/8.jpeg',
        colors: 'White/ Black',
      },
      {
        id: 23,
        name: 'Asics Chunks',
        category:"Sneakers",
        brand: 'ASICS',
        price: '₹ 24,995.00',
        image: '/Images/Sneakers/3.jpg',
        colors: 'White/ Brown',
      },
      {
        id: 24,
        name: 'Puma X-Ray 2',
        category:"Sneakers",
        brand: 'PUMA',
        price: '₹ 13,995.00',
        image: '/Images/Sneakers/5.jpg',
        colors: 'White',
      },
      {
        id: 25,
        name: 'Nike Air Max Excee Men Shoes',
        category:"Sneakers",
        brand: 'NIKE',
        price: '₹ 17,995.00',
        image: '/Images/Sneakers/9.jpg',
        colors: 'White/ Black / Biege',
      },
      //Accessories
      {
        id: 26,
        name: 'Street Cap', 
        category:"Accessories",
        brand: 'NY',
        price: '₹ 1,995.00',
        image: '/Images/Acc/1.jpeg',
        colors: 'Black/Biege',
      },
      {
        id: 27,
        name: 'Sunglass',
        category:"Accessories",
        brand: 'URBAN MONKEY',
        price: '₹ 3,995.00',
        image: '/Images/Acc/2.jpeg',
        colors: 'Black',
      },
      {
        id: 28,
        name: 'Chain',
        category:"Accessories",
        brand: 'Street Vogue',
        price: '₹ 995.00',
        image: '/Images/Acc/3.jpeg',
        colors: 'Silver/Golden',
      },
      {
        id: 29,
        name: 'Hat',
        category:"Accessories",
        brand: 'Street Vogue',
        price: '₹ 2,495.00',
        image: '/Images/Acc/4.jpeg',
        colors: 'Black',
      },
      {
        id: 30,
        name: 'Sunglass',
        category:"Accessories",
        brand: 'Street Vogue',
        price: '₹ 3,995.00',
        image: '/Images/Acc/5.jpeg',
        colors: 'Black',
      },
      {
        id: 31,
        name: 'Street Cap',
        category:"Accessories",
        brand: 'SW',
        price: '₹ 1,995.00',
        image: '/Images/Acc/8.jpeg',
        colors: 'Brown/Navy Blue/Red/Black',
      },
      {
        id: 32,
        name: 'Sunglass',
        category:"Accessories",
        brand: 'SW',
        price: '₹ 1,495.00',
        image: '/Images/Acc/6.jpeg',
        colors: 'Black/Biege',
      },
      {
        id: 33,
        name: 'GodSpeed Cap',
        category:"Accessories",
        brand: 'SW',
        price: '₹ 1,999.00',
        image: '/Images/Acc/9.jpg',
        colors: 'Black/White',
      },
      {
        id: 34,
        name: 'Box Chain Bracelet',
        category:"Accessories",
        brand: 'lux',
        price: '₹ 4,495.00',
        image: '/Images/Acc/10.jpg',
        colors: 'Gold/Silver',
      },
      {
        id: 35,
        name: 'TOM FORD Sunglasses',
        category:"Accessories",
        brand: 'TOM FORD',
        price: '₹ 5,495.00',
        image: '/Images/Acc/11.jpg',
        colors: 'Black/Yellow',
      },
      
    ];

    const productsCollection = collection(db, "products");

    try {
      for (const product of products) {
        await addDoc(productsCollection, product);
      }
      console.log("Products added successfully!");
    } catch (e) {
      console.error("Error adding products: ", e);
    }
  };

  return (
    <div>
      <h1>Add Products to Firestore</h1>
      <p>This is the Add Products page.</p> {/* Temporary check */}
      <button onClick={addProductsToFirestore}
      >Add Products</button>
    </div>
  );
};

export default AddProducts;