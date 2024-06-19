import React from "react";
import { images } from "../../../assets";
import { useSpring, animated } from "@react-spring/web";
import { motion } from "framer-motion";
import {
  Backdrop,
  Box,
  Button,
  CardMedia,
  FormControl,
  IconButton,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from "@mui/material";
import DisplayTextImage from "../Components/DisplayTextImage";
import ClearIcon from "@mui/icons-material/Clear";
import data from "../data";

// react spring for modal animation
const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

const Hero = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        padding: { xs: "2.5rem", md: "4rem 8rem" },
        backgroundImage: `url(${images.backgroundLanding})`,
        marginBottom: { xs: "1rem", md: "2.5rem" },
      }}
    >
      {/* Left side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: { xs: "100%", md: "auto" },
        }}
      >
        <DisplayTextImage
          text={"Supercharge your career growth with AI!"}
          fontSize={{ xs: "2rem", md: "2.5rem" }}
          marginBottom={{ xs: "1rem", md: "1rem" }}
          fontWeight="600"
          highlightWords={["career", "growth"]}
        />
        <CardMedia
          component="img"
          sx={{
            display: { xs: "flex", md: "none" },
            margin: "auto",
            objectFit: "contain",
          }}
          image={images.login}
          alt="landing page image"
        />
        <DisplayTextImage
          text={
            "Use our cutting edge AI tools to boost your career and become Industry ready for top placements!"
          }
          fontSize={{ xs: "1rem", md: "1.5rem" }}
          marginTop={{ xs: "1rem", md: "0rem" }}
          marginBottom={{ xs: "1rem", md: "1rem" }}
        />
        <DisplayTextImage
          text={"#SakshmAI #SakshmBharat"}
          fontSize={{ xs: "1rem", md: "1.5rem" }}
          highlightWords={["#SakshmAI", "#SakshmBharat"]}
          marginBottom={{ xs: "1rem", md: "1rem" }}
        />
        <Button
          size="large"
          variant="contained"
          onClick={handleOpen}
          sx={{
            width: { xs: "100%", md: "fit-content" },
            backgroundColor: "#3366ff",
            color: "white",
            "&:hover": {
              backgroundColor: "#3366ff",
            },
          }}
        >
          Get Started
        </Button>
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
                width: { xs: "90%", md: "100%" },
                maxWidth: { xs: "90%", md: "900px" },
                backgroundColor: isSubmitted ? "#088ECE" : "background.paper",
                boxShadow: 24,
                borderRadius: "10px",
                padding: { xs: "2rem", md: "2rem 4rem" },
              }}
            >
              {!isSubmitted && (
                <>
                  {/* Left side */}
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex" },
                      flexDirection: "column",
                      width: "50%",
                    }}
                  >
                    <DisplayTextImage
                      text="Get Started to power your students with Sakshm.ai!"
                      fontSize={{ xs: "1rem", md: "1.5rem" }}
                      padding={{ xs: "0rem", md: "0rem" }}
                      textWidth={{ xs: "100%", md: "100%" }}
                      marginTop={{ xs: "0rem", md: "0rem" }}
                      marginBottom={{ xs: "0rem", md: "0rem" }}
                      highlightWords={["Sakshm.ai!"]}
                    />
                    {/* Illustrations  */}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0rem 0rem 2rem 2rem",
                        gap: "2rem",
                        marginTop: "2rem",
                      }}
                    >
                      {data.modalData.map((data, idx) => (
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "2rem",
                          }}
                        >
                          <CardMedia
                            component="img"
                            sx={{
                              width: "80px",
                              objectFit: "contain",
                            }}
                            image={data.image}
                            alt="landing page image"
                          />
                          <Typography
                            sx={{
                              fontSize: "1rem",
                              color: "#142349",
                              // fontWeight: "600",
                            }}
                          >
                            {data.text}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                  {/* Right side */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: { xs: "100%", md: "50%" },
                    }}
                  >
                    {/* cross button */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <IconButton aria-label="clear" onClick={handleClose}>
                        <ClearIcon />
                      </IconButton>
                    </Box>

                    <Box
                      component="form"
                      noValidate
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        width: { xs: "100%", md: "80%" },
                        margin: { xs: "auto", md: "auto 0 auto auto" },
                      }}
                    >
                      <FormControl variant="standard" size="small">
                        <OutlinedInput placeholder="Your Name" />
                      </FormControl>

                      <FormControl variant="standard" size="small">
                        <OutlinedInput placeholder="Organization" />
                      </FormControl>

                      <FormControl variant="standard" size="small">
                        <OutlinedInput placeholder="Your Email" />
                      </FormControl>

                      <FormControl variant="standard" size="small">
                        <OutlinedInput placeholder="Mobile Number" />
                      </FormControl>

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <InputLabel shrink htmlFor="message">
                          Message (Optional)
                        </InputLabel>
                        <FormControl variant="standard" size="small">
                          <OutlinedInput
                            placeholder="Message"
                            id="message"
                            multiline
                            rows={3}
                          />
                        </FormControl>
                      </Box>

                      <Button
                        size="large"
                        variant="contained"
                        sx={{
                          width: "100%",
                          backgroundColor: "#3366ff",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#3366ff",
                          },
                        }}
                        onClick={() => setIsSubmitted(true)}
                      >
                        Get Started
                      </Button>
                    </Box>
                  </Box>
                </>
              )}
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column-reverse", md: "row" },
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "2rem",
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{
                          fontSize: { xs: "1.5rem", md: "2rem" },
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        Thank you for submitting your details. Our team will get
                        back to you shortly.
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
                        onClick={() => {
                          handleClose();
                          setTimeout(() => {
                            setIsSubmitted(false);
                          }, 1000);
                        }}
                      >
                        Close
                      </Button>
                    </Box>
                    <CardMedia
                      component="img"
                      sx={{
                        width: { xs: "100%", md: "50%" },
                        objectFit: "contain",
                      }}
                      image={images.thankYou}
                      alt="landing page image"
                    />
                  </Box>
                </motion.div>
              )}
            </Box>
          </Fade>
        </Modal>
      </Box>
      {/* Right side , but not visible on mobile */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          width: "100%",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "400px",
            objectFit: "contain",
          }}
          image={images.landingHeroRight}
          alt="landing page image"
        />
      </Box>
    </Box>
  );
};

export default Hero;
