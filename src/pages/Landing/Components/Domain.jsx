import { Box, CardMedia, Typography } from "@mui/material";

const Domain = ({ text, image, bgColor }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "row", md: "column" },
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        borderRadius: "10px",
        padding: { xs: "1rem", md: "2rem" },
        flex: "1 1 calc(25% - 2rem)",
        width: { xs: "90%", md: "100%" },
        margin: { xs: "auto", md: "0rem" },
      }}
    >
      {/* image */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: bgColor,
          borderRadius: { xs: "5px", md: "10px" },
          width: { xs: "60px", md: "60px" },
          height: { xs: "60px", md: "60px" },
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
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
          fontSize: { xs: "1rem", md: "1rem" },
          color: "#142349",
          fontWeight: "600",
          width: "100%",
          letterSpacing: "1px",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default Domain;
