// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_AUTH_APIKKEY,
  authDomain: "dishdashauth-da04d.firebaseapp.com",
  projectId: "dishdashauth-da04d",
  storageBucket: "dishdashauth-da04d.firebasestorage.app",
  messagingSenderId: "854310139471",
  appId: "1:854310139471:web:11fbc18cb9e4ed88f89c3a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };
