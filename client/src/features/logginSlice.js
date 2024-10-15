// src/slices/loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    user: null,
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload; // Assuming payload contains user info
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

// Export actions
export const { login, logout } = loginSlice.actions;

// Export reducer
export default loginSlice.reducer;
