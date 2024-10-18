// src/features/bookingsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [], // Initialize bookings as an empty array
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action) => {
      state.bookings = action.payload; // Set bookings from Firestore
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload); // Add a new booking
    },
    updateBooking: (state, action) => {
      const { id, updatedData } = action.payload;
      const bookingIndex = state.bookings.findIndex((b) => b.id === id);
      if (bookingIndex !== -1) {
        state.bookings[bookingIndex] = { ...state.bookings[bookingIndex], ...updatedData };
      }
    },
    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload); // Delete booking by id
    },
  },
});

export const { setBookings, addBooking, updateBooking, deleteBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
