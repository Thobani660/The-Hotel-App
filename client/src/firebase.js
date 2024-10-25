// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore
import { getStorage } from "firebase/storage"; // Import Storage

const firebaseConfig = {
  apiKey: "AIzaSyD3iUolWD8g3aSla1UrUWLmigq1KZGNwqA",
  authDomain: "hotelapp-1d07f.firebaseapp.com",
  projectId: "hotelapp-1d07f",
  storageBucket: "hotelapp-1d07f.appspot.com",
  messagingSenderId: "893655304307",
  appId: "1:893655304307:web:c03520de3ac301dbea8206",
  measurementId: "G-H5KSD5LJQR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore
const storage = getStorage(app); // Initialize Storage

export { auth, db, storage }; // Export auth, db, and storage
