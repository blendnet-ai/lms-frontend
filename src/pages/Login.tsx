import { Box, Button, TextField, Typography } from "@mui/material";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "../configs/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../configs/routes";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInputs {
  emailRegister: string;
  passwordRegister: string;
  emailLogin: string;
  passwordLogin: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onEmailPasswordLogin: SubmitHandler<IFormInputs> = (data) => {
    signInWithEmailAndPassword(auth, data.emailLogin, data.passwordLogin)
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode == "auth/invalid-credential") {
          setError("emailLogin", {
            type: "validate",
            message: "",
          });
          setError("passwordLogin", {
            type: "validate",
            message:
              "Either the credentials are invalid or the user is not registered",
          });
        }
      });
  };

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");
      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then((_) => {
            window.localStorage.removeItem("emailForSignIn");
            navigate(ROUTES.HOME);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }
    }
  }, []);

  const sendLoginLink = async () => {
    await sendSignInLinkToEmail(auth, email, {
      url: window.location.href,
      handleCodeInApp: true,
    });

    setLinkSent(true);
    window.localStorage.setItem("emailForSignIn", email);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box
        sx={{
          backgroundColor: "white",
          margin: "auto",
          padding: "80px 60px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {import.meta.env.VITE_LMS_TYPE === "orbit" ? (
          <>
            <form
              style={{
                // width: "100%",
                gap: "16px",
                display: "flex",
                flexDirection: "column",
                width: "30vw",
              }}
              onSubmit={handleSubmit(onEmailPasswordLogin)}
            >
              <TextField
                style={{
                  width: "100%",
                }}
                label="Email"
                {...register("emailLogin", {
                  required: "Please enter the email",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email",
                  },
                })}
                error={!!errors.emailLogin}
                helperText={
                  errors.emailLogin ? errors.emailLogin.message?.toString() : ""
                }
              />
              <TextField
                style={{
                  width: "100%",
                }}
                type="password"
                label="Password"
                {...register("passwordLogin", {
                  required: "Please enter your password",
                })}
                error={!!errors.passwordLogin}
                helperText={
                  errors.passwordLogin ? errors.passwordLogin.message : ""
                }
              />

              <button
                className="email-pass-btn"
                style={{
                  backgroundColor: "#1976d2",
                  border: "none",
                  color: "white",
                  borderRadius: "10px",
                  padding: "20px 40px",
                  alignSelf: "center",
                }}
                type="submit"
              >
                Login
              </button>
            </form>
          </>
        ) : (
          <>
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              Login
            </Typography>
            <Typography variant="h6">Enter your registered Email ID</Typography>
            <TextField
              label="Enter email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              disabled={linkSent}
              variant="contained"
              onClick={sendLoginLink}
            >
              Send login link
            </Button>
            <Typography
              variant="subtitle1"
              sx={{ visibility: linkSent ? "visible" : "hidden" }}
            >
              Login link is sent to your registered email ID
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{ visibility: linkSent ? "visible" : "hidden" }}
            >
              Please make sure to open the link in the same browser.
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Login;
