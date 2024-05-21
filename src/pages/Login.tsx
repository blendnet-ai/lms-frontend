import { User, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "../configs/firebase";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./../styles/Login.css";
import Header from "../components/Header";
import { HomeHeaderContent } from "./Home";

export function LoginContentHeader() {
  return (
    <div className="login-header">
      <div className="login-header-text-container">
        <h1>Welcome to aspireworks</h1>
        <div className="login-header-text">Sign up for free</div>
      </div>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser != null) {
      navigate("/home");
    }
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
      }
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log(auth.currentUser);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Login">
      <Header content={<LoginContentHeader />} />
      <div className="signin-with-google-container" onClick={signInWithGoogle}>
        <img className="google-icon" src="/icons/google.svg" alt="" />
        <h3>Google</h3>
      </div>
    </div>
  );
}

export default Login;
