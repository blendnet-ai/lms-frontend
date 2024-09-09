// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "saksham-staging.firebaseapp.com",
  projectId: "saksham-staging",
  storageBucket: "saksham-staging.appspot.com",
  messagingSenderId: "41417769706",
  appId: "1:41417769706:web:1a6e3a9e1f37cc7ecd4d93",
  measurementId: "G-Y2NBSZQ3RG",
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
