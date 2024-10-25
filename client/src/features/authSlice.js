import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Ensure this is set to null initially
    error: null,
    loading: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload; // Store user info in the state
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Capture error messages
    },
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action) => {
      state.user = action.payload; // Store new user info
      state.loading = false;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Capture signup errors
    },
    logout: (state) => {
      state.user = null; // Clear user on logout
      state.error = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload }; // Update user info in state
    },
  },
});

// Export actions
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
  updateUser, // Action to update user information
} = authSlice.actions;

// Export the reducer
export default authSlice.reducer;
