import React from "react";
import { icons, images } from "../../../assets";
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
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DisplayTextImage from "../Components/DisplayTextImage";
import ClearIcon from "@mui/icons-material/Clear";
import data from "../data";
import GetStarted from "./GetStarted";

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

const Hero = ({ outerPadding, maxWidth }) => {
  const handleScrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        padding: outerPadding,
        backgroundImage: `url(${images.backgroundLanding})`,
        marginBottom: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          maxWidth: maxWidth,
          margin: "auto",
        }}
      >
        {/* Left side */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            width: "100%",
            height: { xs: "100%", md: "auto" },
          }}
        >
          <DisplayTextImage
            text={"Supercharge your career growth with AI!"}
            fontSize={{ xs: "41px", md: "44px" }}
            marginBottom={{ xs: "1rem", md: "1rem" }}
            fontWeight="700"
            highlightWords={["career", "growth"]}
          />
          <DisplayTextImage
            text={
              "Use our cutting edge AI tools to boost your career and become Industry ready for top placements!"
            }
            fontSize={{ xs: "15px", md: "20px" }}
            marginTop={{ xs: "1rem", md: "0rem" }}
            marginBottom={{ xs: "1rem", md: "0.5rem" }}
            fontWeight={"400"}
          />
          <DisplayTextImage
            text={"#SakshmAI #SakshmBharat"}
            fontSize={{ xs: "24px", md: "24px" }}
            highlightWords={["#SakshmAI", "#SakshmBharat"]}
            marginBottom={{ xs: "1rem", md: "2.5rem" }}
            fontWeight={"600"}
          />
          {/* button on mobile view */}
          <Button
            variant="contained"
            sx={{
              display: { xs: "block", md: "none" },
              backgroundColor: "#2059EE",
              color: "white",
              borderRadius: "10px",
              margin: "0 0 1rem 0",
              boxShadow: "1px 10px 12.7px 0px #3177E13D",
              "&:hover": {
                backgroundColor: "#2059EE",
              },
            }}
            onClick={handleScrollToBottom}
          >
            Get Started
          </Button>
          <CardMedia
            component="img"
            sx={{
              display: { xs: "flex", md: "none" },
              margin: "auto",
              objectFit: "contain",
            }}
            image={images.landingHeroRight}
            alt="landing page image"
          />
          {/* Powered by  */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
              border: "1px solid #FFFFFF",
              gap: "0.5rem",
              width: "fit-content",
              padding: "0.5rem",
              boxShadow: "0px 0px 4px 0px #2952CE69",
              borderRadius: "10px",
              position: "relative",
              marginTop: { xs: "2.5rem", md: "0" },
            }}
          >
            <Typography
              sx={{
                position: "absolute",
                // backgroundColor: { xs: "transparent", md: "#fff" },
                padding: "0rem 0.5rem",
                fontSize: "14px",
                color: "#71737A",
                fontWeight: "400",
                top: { xs: "-28px", md: "-28px" },
                left: { xs: "35%", md: "10px" },
                borderRadius: "5px",
              }}
            >
              Powered by
            </Typography>
            <CardMedia
              component="img"
              sx={{
                width: "100px",
                objectFit: "contain",
              }}
              image={icons.rocket}
              alt="landing page image"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: "0.5rem",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "100px",
                  objectFit: "contain",
                }}
                image={icons.razorpay}
                alt="landing page image"
              />
              <CardMedia
                component="img"
                sx={{
                  width: "120px",
                  objectFit: "contain",
                }}
                image={icons.startupIndia}
                alt="landing page image"
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            sx={{
              display: { xs: "none", md: "block" },
              backgroundColor: "#2059EE",
              color: "white",
              borderRadius: "10px",
              marginTop: "auto",
              boxShadow: "1px 10px 12.7px 0px #3177E13D",
              "&:hover": {
                backgroundColor: "#2059EE",
              },
            }}
            onClick={handleScrollToBottom}
          >
            Get Started
          </Button>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end",
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
    </Box>
  );
};

export default Hero;
