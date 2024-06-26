import { createSlice } from "@reduxjs/toolkit";

const loadCartItemsFromLocalStorage = () => {
    try {
      const serializedState = localStorage.getItem('cartItems');
      if (serializedState === null) {
        return [];
      }
      return JSON.parse(serializedState);
    } catch (e) {
      console.warn("Could not load cart items from localStorage", e);
      return [];
    }
  };
  
  const saveCartItemsToLocalStorage = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('cartItems', serializedState);
    } catch (e) {
      console.warn("Could not save cart items to localStorage", e);
    }
  };


  const initialState = {
    cartItems: loadCartItemsFromLocalStorage(),
  };
  
  const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart: (state, action) => {
        state.cartItems.push(action.payload);
        saveCartItemsToLocalStorage(state.cartItems);
      },
      removeFromCart: (state, action) => {
        state.cartItems.splice(action.payload, 1);
        saveCartItemsToLocalStorage(state.cartItems);
      },
      updateQuantity: (state, action) => {
        const { index, quantity } = action.payload;
        state.cartItems[index].quantity = quantity;
        saveCartItemsToLocalStorage(state.cartItems);
      },
    },
  });
  
  export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
  export default cartSlice.reducer;