// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdPOdBhxvXcxDiY8ZkrMsCAeE_TE7cs9Q",
  authDomain: "comuniqa-f8c5b.firebaseapp.com",
  projectId: "comuniqa-f8c5b",
  storageBucket: "comuniqa-f8c5b.appspot.com",
  messagingSenderId: "1081683828600",
  appId: "1:1081683828600:web:bfdf55cc125cefec4fb28d",
  measurementId: "G-2DW2T0GYHC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
