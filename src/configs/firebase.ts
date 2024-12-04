// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "comuniqa-f8c5b.firebaseapp.com",
  projectId: "comuniqa-f8c5b",
  storageBucket: "comuniqa-f8c5b.appspot.com",
  messagingSenderId: "1081683828600",
  appId: "1:1081683828600:web:bfdf55cc125cefec4fb28d",
  measurementId: "G-2DW2T0GYHC",
};

export const actionCodeSettings = {
  url: `${import.meta.env.VITE_FRONTEND_URL}/login`,
  handleCodeInApp: true,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const printIdToken = async () => {
  console.log(await auth.currentUser?.getIdToken());
};
