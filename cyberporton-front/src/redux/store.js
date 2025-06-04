import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import ordersReducer from './slices/ordersSlice';

const persistedUser = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
  preloadedState: {
    user: {
      user: persistedUser,
      status: 'idle',
      error: null,
    }
  }
});