import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [], // Initialize as an empty array
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action) => {
      const index = state.bookings.findIndex((b) => b.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload);
    },
  },
});

export const { setBookings, addBooking, updateBooking, deleteBooking } = bookingsSlice.actions;

export default bookingsSlice.reducer;
