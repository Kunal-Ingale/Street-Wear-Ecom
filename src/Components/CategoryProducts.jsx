import React, { useEffect, useState } from 'react'
import {collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../Firebase/firebase'; 
import Card from './Card';

function CategoryProducts({category}) {
    const[products, setProducts] = useState([]);

    useEffect(()=>{
        const fetchProducts = async ()=>{
            const q = query(collection(db, 'products'),where('category','==',category));
            const querySnap = await getDocs(q);
            const productsData = querySnap.docs.map(doc =>({
                id: doc.id,
                ...doc.data()
            }))
            setProducts(productsData)
           
        }
        fetchProducts();
    },[category])
  return (
    <>
    <Card 
    title={category}
    products={products}
    category={category}
  />
  
  </>
  )
}

export default CategoryProducts
