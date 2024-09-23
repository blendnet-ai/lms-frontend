import {
  Alert,
  Box,
  Button,
  CardMedia,
  Divider,
  IconButton,
  Snackbar,
  SnackbarOrigin,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { images, icons } from "../../assets/index";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, googleProvider } from "../../configs/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import UserDataAPI from "../../apis/UserDataAPI";
import ForgotPassword from "../../components/Modals/ForgotPassword";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
interface IFormInputs {
  emailRegister: string;
  passwordRegister: string;
  emailLogin: string;
  passwordLogin: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface State extends SnackbarOrigin {
  open: boolean;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Login = () => {
  const navigate = useNavigate();
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

  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setError("emailRegister", {
      type: "validate",
      message: "",
    });

    setEmail("");
  };

  const [state, setState] = useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { open } = state;

  const [email, setEmail] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const registerWithEmail = async (email: string) => {
    try {
      const resp = await UserDataAPI.registerUser(email);
      setToastMessage(resp.message);
      setState({ ...state, open: true });
      // redirect to login tab
      setValue(0);
    } catch (err: any) {
      setError("emailRegister", {
        type: "validate",
        message: err.response.data.error,
      });
      console.log("Error: ", err.response.data.error);
    }
  };

  // forget password modal
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const handleOpenForgotPassword = () => {
    setOpenForgotPassword(true);
  };

  const handleCloseForgotPassword = () => {
    setOpenForgotPassword(false);
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
            maxHeight: { xs: "fit-content", md: "600px" },
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
                cursor: "pointer",
              }}
              image={images.sakshamLogo}
              onClick={() => navigate("/")}
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
              padding: { xs: "1rem", md: "2rem" },
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
                  width: { xs: "100px", md: "120px" },
                  mb: { xs: "2rem", md: "0" },
                }}
                image={images.sakshamLogo}
                alt="logo"
              />
            </Box>

            {/* Tabs and TabPanels */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                margin: "auto 0",
              }}
            >
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Tab
                    sx={{
                      width: "50%",
                    }}
                    label="Login"
                    {...a11yProps(0)}
                  />
                  <Tab
                    sx={{
                      width: "50%",
                    }}
                    label="Register"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              {/* Login TabPanel */}
              <CustomTabPanel value={value} index={0}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    mb: "1rem",
                  }}
                >
                  Welcome Back!
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
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    mb: "1rem",
                  }}
                >
                  Sign in with your college credentials
                </Typography>
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

                {/* forgot password  */}
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    mt: "1rem",
                    textAlign: "end",
                    cursor: "pointer",
                  }}
                  onClick={handleOpenForgotPassword}
                >
                  Forgot Password?
                </Typography>
              </CustomTabPanel>

              {/* Register TabPanel */}
              <CustomTabPanel value={value} index={1}>
                <Typography
                  sx={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    mb: "1rem",
                  }}
                >
                  Create an account to get started.
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
                    Sign Up with Google
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
                <Typography
                  sx={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    mb: "1rem",
                  }}
                >
                  Sign up with your college credentials
                </Typography>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <TextField
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email"
                      size="small"
                    />
                    {/* errors  */}
                    {errors.emailRegister && (
                      <Typography sx={{ color: "red", fontSize: "0.8rem" }}>
                        {errors.emailRegister.message}
                      </Typography>
                    )}
                  </Box>
                  {/* sign up button  */}
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: "0rem", marginTop: "10px" }}
                    onClick={() => registerWithEmail(email)}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: "white",
                        textTransform: "none",
                      }}
                    >
                      Sign Up
                    </Typography>
                  </Button>
                </Box>
              </CustomTabPanel>
            </Box>
          </Box>
        </Box>
      </Box>
      <Snackbar open={open} autoHideDuration={3000}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {toastMessage}
        </Alert>
      </Snackbar>

      {/* forgot password modal */}
      <ForgotPassword
        open={openForgotPassword}
        close={handleCloseForgotPassword}
      />
    </motion.div>
  );
};

export default Login;
