import React from "react";
import { icons, images } from "../../../assets";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import DisplayTextImage from "../Components/DisplayTextImage";

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
        marginBottom: "2rem",
        position: "relative",
      }}
    >
      {/* right radial gradient */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          backgroundImage:
            "radial-gradient(closest-side,rgba(69, 205, 247, 0.15),white)",
          zIndex: "-1",
          top: "0px",
          right: "0px",
          height: "100%",
          width: "500px",
        }}
      />
      {/* left radial gradient */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          backgroundImage:
            "radial-gradient(closest-side,rgba(69, 205, 247, 0.15),white)",
          zIndex: "-1",
          bottom: "0px",
          left: "-200px",
          height: "100%",
          width: "500px",
        }}
      />
      <Box
        sx={{
          display: "flex",
          maxWidth: maxWidth,
          margin: "auto",
          minWidth: "75rem",
          gap: "3rem",
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
            text={"Reimagine learning with Gen AI!"}
            fontSize={{ xs: "38px", sm: "60px", md: "42px" }}
            marginBottom={{ xs: "1rem", md: "1rem" }}
            fontWeight="700"
            width="80%"
          />
          <DisplayTextImage
            text={
              "Use our Personal AI Tutor to upskill your learners now!"
            }
            fontSize={{ xs: "15px", sm: "30px", md: "30px" }}
            marginTop={{ xs: "1rem", md: "0rem" }}
            marginBottom={{ xs: "1rem", md: "0.5rem" }}
            fontWeight={"400"}
            highlightWordsColor="black"
            highlightWordsList={["Personal", "AI", "Tutor"]}
            highlightWordsFontWeight="700"
            width="70%"
          />
          <DisplayTextImage
            text={"#SakshmAI #SakshmBharat"}
            fontSize={{ xs: "24px", sm: "24px", md: "20px" }}
            marginBottom={{ xs: "1rem", md: "2.5rem" }}
            fontWeight={"600"}
            highlightWordsList={["#SakshmAI", "#SakshmBharat"]}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2059EE",
              color: "white",
              borderRadius: "10px",
              margin: "0 0 1rem 0",
              boxShadow: "1px 10px 12.7px 0px #3177E13D",
              width: {
                xs: "fit-content",
                sm: "180px",
                md: "fit-content",
              },
              height: { xs: "100%", sm: "80px", md: "auto" },
              fontSize: { xs: "14px", sm: "20px", md: "14px" },
              "&:hover": {
                backgroundColor: "#2059EE",
              },
              padding: { xs: "0.5rem 1rem", sm: "0.5rem 1rem", md: "0.5rem 1rem" },
            }}
            onClick={handleScrollToBottom}
          >
            Get Started
          </Button>
          <CardMedia
            component="img"
            sx={{
              display: { xs: "flex", md: "none" },
              margin: "150px",
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
              alignItems: "center",
              border: "1px solid #FFFFFF",
              gap: "0.5rem",
              width: "auto",
              padding: "0.5rem",
              boxShadow: "0px 0px 4px 0px #2952CE69",
              borderRadius: "10px",
              position: "relative",
              // margin: "auto",
              marginTop: { xs: "2.5rem", sm: "2.5rem" },
              marginBottom: { md: "2.5rem" },
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
                width: "200px",
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
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: "200px",
                  objectFit: "contain",
                }}
                image={icons.razorpay}
                alt="landing page image"
              />
              <CardMedia
                component="img"
                sx={{
                  width: "200px",
                  objectFit: "contain",
                }}
                image={icons.startupIndia}
                alt="landing page image"
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-start",
            width: "100%",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: "100px", md:"500px" },
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
