import { Box, CardMedia, Typography } from "@mui/material";

const Domain = ({ text, image, bgColor }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        gap: "1rem",
        borderRadius: "10px",
        padding: { xs: "1rem", md: "1.5rem" },
        flex: "1 1 calc(25% - 2rem)",
        width: { xs: "90%", md: "100%" },
        margin: { xs: "auto", md: "0rem" },
        // boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        boxShadow: "0px 0px 4px 0px #2952CE69",
        // backgroundColor: bgColor,
        position: "relative",
      }}
    >
      {/* image */}
      <Box
        sx={{
          display: "flex",
          position: { xs: "relative", md: "absolute" },
          right: { xs: "0", md: "50%" },
          top: { xs: "0", md: "50%" },
          transform: { xs: "none", md: "translate(50%, -120%)" },
          borderRadius: { xs: "5px", md: "10px" },
          width: { xs: "60px", md: "100px" },
          height: { xs: "60px", md: "100px" },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "calc(100% - 10px)", md: "calc(100% - 20px)" },
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
          textAlign: { xs: "right", md: "center" },
          fontSize: { xs: "1rem", md: "1rem" },
          color: "#142349",
          fontWeight: "600",
          width: "100%",
          letterSpacing: "1px",
          marginTop: { xs: "0px", md: "2rem" },
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Domain;
