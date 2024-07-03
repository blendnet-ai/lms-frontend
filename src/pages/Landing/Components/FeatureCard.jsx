import { Box, CardMedia, Typography } from "@mui/material";

const FeatureCard = ({ title, img, desc }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        position: "relative",
        padding: "2rem",
        borderRadius: "20px",
        boxShadow: "0px 0px 30.2px 0px #32558930",
      }}
    >
      {/* image float right */}
      <CardMedia
        component="img"
        sx={{
          width: { xs: "100px", md: "150px" },
          objectFit: "contain",
          position: { xs: "", md: "absolute" },
          right: "0",
          top: "-60px",
        }}
        image={img}
        alt="feature card 1"
      />

      <Box
        sx={{
          height: "100%",
          marginTop: { xs: "1rem", md: "80px" },
        }}
      >
        {/* heading  */}
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "1.5rem", md: "30px" },
            color: "#142349",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          {title}
        </Typography>

        {/* description  */}
        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "20px" },
            color: "#142349",
          }}
        >
          {desc}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeatureCard;
