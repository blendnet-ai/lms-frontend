// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lms-staging-477ad.firebaseapp.com",
  projectId: "lms-staging-477ad",
  storageBucket: "lms-staging-477ad.firebasestorage.app",
  messagingSenderId: "44068588474",
  appId: "1:44068588474:web:be4dd88968eb31ef14ab83",
  measurementId: "G-NH166F2N7Z",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const printIdToken = async () => {
  console.log(await auth.currentUser?.getIdToken());
};