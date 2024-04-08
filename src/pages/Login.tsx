import { User, signInWithRedirect } from "firebase/auth";
import { auth, googleProvider } from "../configs/firebase";
import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.currentUser != null) {
      navigate("/");
    }
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/");
      }
    });
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithRedirect(auth, googleProvider);
      console.log(auth.currentUser);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="Login">
      <button
        className="signin-with-google-container"
        onClick={signInWithGoogle}
      >
        <img className="google-icon" src="/icons/google.png" alt="" />
        SignIn with google
      </button>
    </div>
  );
}

export default Login;
