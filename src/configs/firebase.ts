// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: window.env.VITE_FIREBASE_API_KEY,
  authDomain: window.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: window.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: window.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: window.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: window.env.VITE_FIREBASE_APP_ID,
  measurementId: window.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const printIdToken = async () => {
  console.log(await auth.currentUser?.getIdToken());
};
