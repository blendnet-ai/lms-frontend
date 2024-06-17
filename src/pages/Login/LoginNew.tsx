import {
  Backdrop,
  Box,
  Button,
  CardMedia,
  Checkbox,
  Divider,
  Fade,
  FormControl,
  FormControlLabel,
  IconButton,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { images, icons } from "../../assets/index";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";

const LoginNew = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          width: "100vw",
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
              width: { xs: "0%", md: "60%" },
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
              width: { xs: "100%", md: "40%" },
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
              onClick={() => navigate(-1)}
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
                with your college credentials
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
              <FormControl variant="standard" size="small" fullWidth>
                <OutlinedInput placeholder="Your Email" />
              </FormControl>
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="Keep me signed in"
                labelPlacement="end"
              />
              {/* sign up button  */}
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: "0rem" }}
                onClick={handleOpen}
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
          {/* Modal  */}
          <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                TransitionComponent: Fade,
              },
            }}
          >
            <Fade in={open}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: { xs: "80%", md: "100%" },
                  maxWidth: { xs: "90%", md: "400px" },
                  backgroundColor: "white",
                  boxShadow: 24,
                  borderRadius: "10px",
                  padding: { xs: "2rem", md: "2rem 4rem" },
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: {
                        xs: "column-reverse",
                        md: "column-reverse",
                      },
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "2rem",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2rem",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: { xs: "1rem", md: "1.5rem" },
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        Your college credentials not match with our data. Please
                        contact your college admin.
                      </Typography>
                      <Button
                        size="large"
                        fullWidth
                        variant="contained"
                        sx={{
                          backgroundColor: "white",
                          color: "#3366ff",
                          "&:hover": {
                            backgroundColor: "white",
                          },
                        }}
                        onClick={handleClose}
                      >
                        Close
                      </Button>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: "70%", md: "50%" },
                        objectFit: "contain",
                      }}
                      image={images.wrongLoginCred}
                      alt="landing page image"
                    />
                  </Box>
                </motion.div>
              </Box>
            </Fade>
          </Modal>
        </Box>
      </Box>
    </motion.div>
  );
};

export default LoginNew;
