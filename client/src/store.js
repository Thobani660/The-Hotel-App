// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './features/logginSlice'; 

const store = configureStore({
    reducer: {
        login: loginReducer, 
    },
});

export default store;
