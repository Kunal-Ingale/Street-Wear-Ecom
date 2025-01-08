import React, { createContext, useReducer } from 'react';

//helper functions..
const loadCartItemsFromLocalStorage = () => {
  try {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
  } catch (e) {
    console.warn("Could not load cart items from localStorage", e);
    return [];
  }
};

const saveCartItemsToLocalStorage = (items) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(items));
  } catch (e) {
    console.warn("Could not save cart items to localStorage", e);
  }
};


const initialState = {
  cartItems: loadCartItemsFromLocalStorage(),
};

// Cart reducer
const cartReducer = (state, action) => {
  switch(action.type) {
    case 'ADD_TO_CART': {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        item => item.name === newItem.name && item.brand === newItem.brand
      );

      let updatedCart;
      if (existingItemIndex !== -1) {
        updatedCart = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cartItems, { ...newItem, id: Date.now() }];
      }
      
      saveCartItemsToLocalStorage(updatedCart);
      return { ...state, cartItems: updatedCart };
    }

    case 'REMOVE_FROM_CART': {
      const updatedCart = state.cartItems.filter(item => item.id !== action.payload);
      saveCartItemsToLocalStorage(updatedCart);
      return { ...state, cartItems: updatedCart };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const updatedCart = state.cartItems.map(item =>
        item.id === id ? { ...item, quantity } : item
);
      saveCartItemsToLocalStorage(updatedCart);
      return { ...state, cartItems: updatedCart };
    }

    case 'CLEAR_CART': {
      saveCartItemsToLocalStorage([]);
      return { ...state, cartItems: [] };
    }

    default:
      return state;
  }
};


export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = (itemId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      cartItems: state.cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};