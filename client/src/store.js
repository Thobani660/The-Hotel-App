import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './features/registerSlice';
import logginSlice from './features/logginSlice';
import authSlice from './features/authSlice';
import bookingsSlice from './features/bookingsSlice';
import favouritesSlice from './features/favouritesSlice'; 

export const store = configureStore({
  reducer: {
    register: registerSlice,
    loggin: logginSlice,
    auth: authSlice,
    bookings: bookingsSlice, 
    favourites: favouritesSlice,
  },
});
