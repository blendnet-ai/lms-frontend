import { Box, CardMedia, Typography } from "@mui/material";

const Domain = ({ text, image, bgColor, boxShadow, maxWidth }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        borderRadius: "10px",
        padding: "1.5rem",
        flex: "1 1 calc(25% - 2rem)",
        width: { xs: "100%", md: "100%" },
        boxShadow: boxShadow,
        position: "relative",
      }}
    >
      {/* image */}
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          right: "50%",
          top: { xs: "50%", md: "80%" },
          transform: "translate(50%, -120%)",
          borderRadius: { xs: "5px", md: "10px" },
          width: { xs: "120px", md: "200px" },
          height: { xs: "120px", md: "200px" },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            objectFit: "contain",
          }}
          image={image}
          alt="landing page image"
        />
      </Box>
      {/* text */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontSize: "1rem",
          color: "#142349",
          fontWeight: "600",
          width: "100%",
          maxWidth: maxWidth,
          letterSpacing: "1px",
          marginTop: { xs: "3rem", md: "5rem" },
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Domain;
