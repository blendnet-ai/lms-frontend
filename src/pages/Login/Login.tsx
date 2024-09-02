import {
  Backdrop,
  Box,
  Button,
  CardMedia,
  Checkbox,
  Divider,
  Fade,
  FormControlLabel,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { images, icons } from "../../assets/index";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../../configs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import NotRegisteredModal from "../../components/NotRegisteredModal/NotRegisteredModal";

interface IFormInputs {
  emailRegister: string;
  passwordRegister: string;
  emailLogin: string;
  passwordLogin: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInputs>();

  useEffect(() => {
    if (auth.currentUser != null) {
      navigate("/");
    }
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  // if the user is already registered with email then make it login, otherwise register the user with email
  const handleSignInRegister: SubmitHandler<IFormInputs> = async (data) => {
    // try {
    //   await signInWithEmailAndPassword(
    //     auth,
    //     data.emailLogin,
    //     data.passwordLogin
    //   );
    // } catch (error) {
    //   console.log(error);
    //   try {
    //     await createUserWithEmailAndPassword(
    //       auth,
    //       data.emailLogin,
    //       data.passwordLogin
    //     );
    //   } catch (error: any) {
    //     if (error.code === "auth/email-already-in-use") {
    //       setError("emailLogin", {
    //         type: "manual",
    //         message: "Email already in use",
    //       });
    //     } else if (error.code === "auth/weak-password") {
    //       setError("passwordLogin", {
    //         type: "manual",
    //         message: "Password is too weak",
    //       });
    //     }
    //     console.error(error);
    //   }
    // }
    handleOpen();
  };

  const handleEmailPassLogin: SubmitHandler<IFormInputs> = (data) => {
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
              "Either the credentials are invalid or the user is unregistered.",
          });
        }
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "100%",
            width: "100%",
            maxWidth: { xs: "90%", md: "800px" },
            maxHeight: { xs: "90%", md: "500px" },
            borderRadius: "20px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            // boxShadow: "0px 0px 4px 0px #2952CE69",
          }}
        >
          {/* left side */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "0%", md: "50%" },
              backgroundColor: "#eff6ff",
              borderRadius: "20px 0px 0px 20px",
              padding: { xs: "0px", md: "2rem" },
            }}
          >
            {/* Logo  */}
            <CardMedia
              component="img"
              sx={{
                width: "120px",
                objectFit: "contain",
              }}
              image={images.sakshamLogo}
              alt="logo"
            />
            {/* illustration */}
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                objectFit: "contain",
                m: "auto",
              }}
              image={images.login}
              alt="illustration"
            />
          </Box>
          {/* right side */}
          <Box
            sx={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", md: "50%" },
              borderRadius: { xs: "20px", md: "0px 20px 20px 0px" },
              padding: { xs: "2rem", md: "4rem" },
              position: "relative",
            }}
          >
            <IconButton
              color="primary"
              size="large"
              sx={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                backgroundColor: "#eff6ff",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
              }}
              onClick={() => navigate("/")}
            >
              <ArrowBackIcon />
            </IconButton>
            {/* logo on mobile */}
            <Box>
              <CardMedia
                component="img"
                sx={{
                  display: { xs: "flex", md: "none" },
                  width: "120px",
                }}
                image={images.sakshamLogo}
                alt="logo"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "auto 0",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontsize: "1rem",
                  fontWeight: 600,
                }}
              >
                Login
              </Typography>
              <Typography variant="body1" sx={{ mb: "1rem" }}>
                with your College / Institution Id
              </Typography>
              <Button
                size="large"
                variant="outlined"
                fullWidth
                sx={{
                  boxShadow: "0px 1px 2px 0px #00000008",
                  outline: "none",
                  borderRadius: "10px",
                  textTransform: "none",
                }}
                onClick={signInWithGoogle}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                    color: "black",
                    textTransform: "none",
                  }}
                >
                  Sign In with Google
                </Typography>
                {/* google icon */}
                <CardMedia
                  component="img"
                  sx={{
                    width: "20px",
                    ml: "1rem",
                  }}
                  image={icons.google}
                  alt="google"
                />
              </Button>
              <Divider
                sx={{
                  margin: "1rem 0",
                  color: "lightgray",
                }}
              >
                or
              </Divider>
              <Box
                component="form"
                onSubmit={handleSubmit(handleEmailPassLogin)}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <TextField
                    type="email"
                    placeholder="Your Email"
                    size="small"
                    {...register("emailLogin", {
                      required: "Please enter the email",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Please enter a valid email",
                      },
                    })}
                    error={!!errors.emailLogin}
                    helperText={
                      errors.emailLogin
                        ? errors.emailLogin.message?.toString()
                        : ""
                    }
                  />

                  <TextField
                    type="password"
                    placeholder="Password"
                    {...register("passwordLogin", {
                      required: "Please enter your password",
                    })}
                    error={!!errors.passwordLogin}
                    helperText={
                      errors.passwordLogin ? errors.passwordLogin.message : ""
                    }
                    size="small"
                  />
                </Box>
                {/* <FormControlLabel
                  value="end"
                  control={<Checkbox />}
                  label="Keep me signed in"
                  labelPlacement="end"
                /> */}
                {/* sign up button  */}
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mt: "0rem", marginTop: "10px" }}
                  type="submit"
                >
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 600,
                      color: "white",
                      textTransform: "none",
                    }}
                  >
                    Sign In
                  </Typography>
                </Button>
              </Box>
            </Box>
          </Box>
          {/* Modal  */}
          <NotRegisteredModal open={open} data={{}} />
        </Box>
      </Box>
    </motion.div>
  );
};

export default Login;
