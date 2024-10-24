// src/features/bookingFormSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  subheader: '',
  description: '',
  price: '',
  imageUrl: '',
  error: null,
};

const bookingFormSlice = createSlice({
  name: 'bookingForm',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => initialState,
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { updateFormData, resetForm, setError } = bookingFormSlice.actions;
export default bookingFormSlice.reducer;
