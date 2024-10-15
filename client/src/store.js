import { configureStore } from '@reduxjs/toolkit'
import registerSlice from './features/registerSlice'
export const store = configureStore({
  reducer: {
    register: registerSlice,
  },
})