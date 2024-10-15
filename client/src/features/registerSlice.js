// src/slices/registerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isRegistered: false,
    user: null,
    loading: false,
    error: null,
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        registerSuccess: (state, action) => {
            state.loading = false;
            state.isRegistered = true;
            state.user = action.payload;
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

// Export actions
export const { registerRequest, registerSuccess, registerFailure } = registerSlice.actions;

// Export reducer
export default registerSlice.reducer;
    // create thunk fire base sign up user into fire base ,activate auth on firebase,alert user signedup,call func thunk 
