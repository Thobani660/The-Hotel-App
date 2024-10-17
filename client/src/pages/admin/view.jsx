// // src/features/authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase'; // Firebase auth import

// // User login thunk
// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       return userCredential.user;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// // Admin login thunk
// export const loginAdmin = createAsyncThunk(
//   'auth/loginAdmin',
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       const adminCredential = await signInWithEmailAndPassword(auth, email, password);
//       const admin = adminCredential.user;

//       // Add extra check to ensure admin role (assuming you have admin role in your Firebase user management)
//       if (admin && admin.email === "admin@domain.com") { // Replace with your logic to distinguish admins
//         return admin;
//       } else {
//         throw new Error("Unauthorized access. Admins only.");
//       }
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     admin: null,
//     error: null,
//     loading: false,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.admin = null;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // User login
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       // Admin login
//       .addCase(loginAdmin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginAdmin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.admin = action.payload;
//         state.error = null;
//       })
//       .addCase(loginAdmin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
