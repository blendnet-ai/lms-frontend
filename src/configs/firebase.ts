// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: window.env.VITE_FIREBASE_API_KEY,
  authDomain: "lms-prod-45d29.firebaseapp.com",
  projectId: "lms-prod-45d29",
  storageBucket: "lms-prod-45d29.firebasestorage.app",
  messagingSenderId: "787702810821",
  appId: "1:787702810821:web:3a6586a86f07ee41cdc8ac",
  measurementId: "G-7Z0P1VR8QN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const printIdToken = async () => {
  console.log(await auth.currentUser?.getIdToken());
};
