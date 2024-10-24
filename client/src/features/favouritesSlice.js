// src/features/favouritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: [],
  reducers: {
    addFavourite: (state, action) => {
      // Add the new favourite if it doesn't already exist
      const existingFavourite = state.find(favourite => favourite.id === action.payload.id);
      if (!existingFavourite) {
        state.push(action.payload);
      }
    },
    removeFavourite: (state, action) => {
      // Remove the favourite that matches the id
      return state.filter(favourite => favourite.id !== action.payload.id);
    },
    clearFavourites: (state) => {
      // Clear all favourites
      return [];
    },
  },
});

// Export actions for use in components
export const { addFavourite, removeFavourite, clearFavourites } = favouritesSlice.actions;

// Export the reducer to be included in the store
export default favouritesSlice.reducer;
