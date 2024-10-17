import { configureStore } from '@reduxjs/toolkit';
import registerSlice from './features/registerSlice';
import logginSlice from './features/logginSlice';
import authSlice from './features/authSlice';

export const store = configureStore({
  reducer: {
    register: registerSlice,
    loggin: logginSlice,
    auth: authSlice, // Change authReducer to auth
  },
});
