// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import env from "react-dotenv";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBdPOdBhxvXcxDiY8ZkrMsCAeE_TE7cs9Q",
//   authDomain: "comuniqa-f8c5b.firebaseapp.com",
//   projectId: "comuniqa-f8c5b",
//   storageBucket: "comuniqa-f8c5b.appspot.com",
//   messagingSenderId: "1081683828600",
//   appId: "1:1081683828600:web:bfdf55cc125cefec4fb28d",
//   measurementId: "G-2DW2T0GYHC",
// };
// for staging 
const firebaseConfig = {
  apiKey: "AIzaSyDwiJkwIFNfCrRgF5FXN9INh6iW4sDABME",
  authDomain: "saksham-staging.firebaseapp.com",
  projectId: "saksham-staging",
  storageBucket: "saksham-staging.appspot.com",
  messagingSenderId: "41417769706",
  appId: "1:41417769706:web:1a6e3a9e1f37cc7ecd4d93",
  measurementId: "G-Y2NBSZQ3RG",
};
export const actionCodeSettings = {
  url: `${env.FRONTEND_URL}/login`,
  handleCodeInApp: true,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const printIdToken = async () => {
  console.log(await auth.currentUser?.getIdToken());
};
