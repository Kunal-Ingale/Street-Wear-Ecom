import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Features/CartSlice'

 const store = configureStore({
    reducer:{
        cart: cartReducer
    }
})

export default store;