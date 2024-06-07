import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
} from "firebase/auth";
import {
  actionCodeSettings,
  auth,
  googleProvider,
} from "../../configs/firebase";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "../../components/Header/Header";
import { TextField } from "@mui/material";
import { icons } from "../../assets";

interface IFormInputs {
  email: string;
}

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (auth.currentUser != null) {
      navigate("/home");
    }
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/home");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const email = window.localStorage.getItem("emailForSignIn");
      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then(() => {
            window.localStorage.removeItem("emailForSignIn");
          })
          .catch((error) => {
            console.error(`Couldn't sign in with the provided link: ${error}`);
          });
      }
    }
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log(auth.currentUser);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    sendSignInLinkToEmail(auth, data.email, actionCodeSettings)
      .then(() => {
        setEmailSent(true);
        window.localStorage.setItem("emailForSignIn", data.email);
      })
      .catch((error) => {
        console.error(`Couldn't send link to email: ${error}`);
      });
  };

  return (
    <div className="Login">
      <Header content={<LoginContentHeader />} />
      {!emailSent ? (
        <>
          <div
            className="signin-with-google-container"
            onClick={signInWithGoogle}
          >
            <img className="google-icon" src={icons.google} alt="Google icon" />
            <h3>Google</h3>
          </div>
          {/* <div className="Login-other">
            <div>Or</div>
            <form
              className={"Login-other-email"}
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextField
                label="Email"
                style={{ width: "90vw" }}
                {...register("email", {
                  required: "Please enter the email",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email",
                  },
                })}
                error={!!errors.email}
                helperText={
                  errors.email ? errors.email.message?.toString() : ""
                }
              />
              <button type="submit">Get link to login</button>
            </form>
          </div> */}
        </>
      ) : (
        <h3 className="Login-link-sent">
          Link to login has been sent to your email!
        </h3>
      )}
    </div>
  );
}

export default Login;
