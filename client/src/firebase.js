// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-f4c8b.firebaseapp.com",
  projectId: "mern-blog-f4c8b",
  storageBucket: "mern-blog-f4c8b.appspot.com",
  messagingSenderId: "334744029441",
  appId: "1:334744029441:web:8555ff1be7f80510717300",
  measurementId: "G-BT7WEKYNQ0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);