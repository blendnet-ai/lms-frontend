import { Box, CardMedia, Typography } from "@mui/material";

const StepsCard = ({ count, title, desc, image, position }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: position === "left" ? "row" : "row-reverse",
        width: "100%",
        alignItems: "center",
      }}
    >
      {/* Left side  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          width: "50%",
          gap: "1rem",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "2rem", md: "90px" },
            fontWeight: "600",
            background: `linear-gradient(180deg, #189F6C 0%, #96CFBA 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {count}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontSize: "40px",
            fontWeight: "700",
            color: "#2059ee",
          }}
        >
          {title.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            fontSize: "20px",
            color: "#142349",
            fontWeight: "600",
          }}
        >
          {desc}
        </Typography>
      </Box>
      {/* Right side */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          width: "50%",
          // border: "1px solid #E0E0E0",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            // width: "500px",
            objectFit: "contain",
            userSelect: "none",
          }}
          image={image}
          alt="Step illustration"
        />
      </Box>
    </Box>
  );
};

export default StepsCard;
