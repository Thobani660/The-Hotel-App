// src/store.js (or wherever your store is defined)
import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './features/registerSlice';
import logginSlice from './features/logginSlice';
import authSlice from './features/authSlice';
import bookingsSlice from './features/bookingsSlice';

export const store = configureStore({
  reducer: {
    register: registerSlice,
    loggin: logginSlice,
    auth: authSlice,
    bookings: bookingsSlice, // Change this to 'bookings'
  },
});
