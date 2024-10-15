// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3iUolWD8g3aSla1UrUWLmigq1KZGNwqA",
  authDomain: "hotelapp-1d07f.firebaseapp.com",
  projectId: "hotelapp-1d07f",
  storageBucket: "hotelapp-1d07f.appspot.com",
  messagingSenderId: "893655304307",
  appId: "1:893655304307:web:c03520de3ac301dbea8206",
  measurementId: "G-H5KSD5LJQR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);