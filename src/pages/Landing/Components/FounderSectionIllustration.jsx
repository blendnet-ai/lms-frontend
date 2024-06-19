import { Box, CardMedia, Typography } from "@mui/material";
import DisplayTextImage from "./DisplayTextImage";

const FounderSectionIllustration = ({ text, image, highlightWords }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        height: "100%",
      }}
    >
      {/* illustration */}
      <CardMedia
        component="img"
        sx={{
          display: { xs: "none", md: "block" },
          width: "100px",
          height: "100px",
          objectFit: "contain",
        }}
        image={image}
        alt="Mentoring illustration"
      />
      {/* about  */}
      <Box
        sx={{
          display: "flex",
          padding: "1rem",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          height: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            color: "#142349",
            textAlign: "center",
          }}
        >
          <DisplayTextImage
            text={text}
            fontWeight={600}
            textAlignment="center"
            highlightWords={highlightWords}
            highlightWordsColor="#0CAA6A"
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default FounderSectionIllustration;
