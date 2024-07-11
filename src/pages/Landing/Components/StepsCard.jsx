import { Box, CardMedia, Typography } from "@mui/material";

const StepsCard = ({ count, title, desc, image, position }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column-reverse",
          md: position === "left" ? "row" : "row-reverse",
        },
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
          width: { xs: "100%", md: "50%" },
          gap: "1rem",
          alignItems: { xs: "center", md: "flex-start" },
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
            fontSize: { xs: "20px", md: "40px" },
            fontWeight: "700",
            color: "#2059ee",
          }}
        >
          {title.toUpperCase()}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: "18px", md: "20px" },
            color: "#142349",
            fontWeight: { xs: "400", md: "400" },
            textAlign: { xs: "center", md: "left" },
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
          width: { xs: "100%", md: "50%" },
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
