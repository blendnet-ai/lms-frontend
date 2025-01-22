import { Box, Button, TextField, Typography } from "@mui/material";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";
import { auth } from "../configs/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../configs/routes";

const Login = () => {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const navigate = useNavigate();

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
        <Button disabled={linkSent} variant="contained" onClick={sendLoginLink}>
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
      </Box>
    </Box>
  );
};

export default Login;
