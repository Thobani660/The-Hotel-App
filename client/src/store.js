import { configureStore } from '@reduxjs/toolkit'
import registerSlice from './features/registerSlice'
import logginSlice from './features/logginSlice'
export const store = configureStore({
  reducer: {
    register: registerSlice,
    loggin:logginSlice,
  },
})