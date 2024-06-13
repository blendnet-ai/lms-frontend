import { Box, CardMedia, Typography } from "@mui/material";
import DisplayTextImage from "./DisplayTextImage";

const FounderSectionIllustration = ({ text, image }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {/* illustration */}
      <CardMedia
        component="img"
        sx={{
          display: { xs: "none", md: "block" },
          width: "100px",
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
          paddingTop: "0rem",
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
            marginTop: "1rem",
          }}
        >
          <DisplayTextImage text={text} textAlignment="center" />
        </Typography>
      </Box>
    </Box>
  );
};

export default FounderSectionIllustration;
