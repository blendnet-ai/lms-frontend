import { images } from "../../../assets";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import DisplayTextImage from "../Components/DisplayTextImage";

const Hero = ({
  outerPadding,
  maxWidth,
}: {
  outerPadding: { xs: string; sm: string; md: string };
  maxWidth: string;
}) => {
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: maxWidth,
          margin: "auto",
          justifyContent: "start",
          width: "100%",
          height: { xs: "100%", md: "auto" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <DisplayTextImage
            text={
              "Land your dream job with India’s first AI Tutor for Tech Skills"
            }
            textAlignment="center"
            placeNewLineAfterWord="with"
            fontSize={{ xs: "26px", md: "40px" }}
            highlightWordsList={["Tutor", "AI"]}
            highlightWordsFontWeight="700"
            highlightWordsColor={["#6A4BE4", "#063FD4"]}
            fontWeight="700"
            width="100%"
          />
          <DisplayTextImage
            text={
              "Supercharge your career and become industry ready with AI-powered learning, assessments & interviews"
            }
            textAlignment="center"
            placeNewLineAfterWord="ready"
            fontSize={{ xs: "20px", md: "22px" }}
            fontWeight={"400"}
            width="100%"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            maxWidth: "400px",
            margin: "auto",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#2059EE",
              padding: "0.4rem 1.4rem",
              color: "white",
              borderRadius: "10px",
              boxShadow: "1px 10px 12.7px 0px #3177E13D",
              "&:hover": {
                backgroundColor: "#2059EE",
              },
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                fontSize: "0.8rem",
              }}
            >
              Try out Now!
            </Typography>
          </Button>
          <CardMedia
            component="img"
            sx={{
              display: "flex",
              objectFit: "contain",
              width: "450px",
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
