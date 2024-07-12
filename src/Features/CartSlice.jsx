import { createSlice } from "@reduxjs/toolkit";
import { getAuth } from "firebase/auth";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.cartItems.splice(action.payload, 1);
    },
    updateQuantity: (state, action) => {
      const { index, quantity } = action.payload;
      state.cartItems[index].quantity = quantity;
    },
    clearCart: (state) => {
      state.cartItems = []; // Clear the cart items
    },
  },
});

export const { setCartItems, addToCart, removeFromCart, updateQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Fetch cart items from localStorage
export const fetchCartItems = () => (dispatch) => {
  const user = getAuth().currentUser;
  if (user) {
    const items = JSON.parse(localStorage.getItem(`cart-${user.uid}`)) || [];
    dispatch(setCartItems(items));
  }
};

// Save cart items to localStorage
export const saveCartItems = () => (dispatch, getState) => {
  const user = getAuth().currentUser;
  if (user) {
    const items = getState().cart.cartItems;
    localStorage.setItem(`cart-${user.uid}`, JSON.stringify(items));
  }
};
