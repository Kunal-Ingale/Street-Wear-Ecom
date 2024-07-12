import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Features/CartSlice'
import authReducer from './Features/AuthSlice'

 const store = configureStore({
    reducer:{
        cart: cartReducer,
        auth:authReducer
    }
})

export default store;