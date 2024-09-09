import { Box, CardMedia, Typography } from "@mui/material";

const Domain = ({
  text,
  image,
  boxShadow,
  desc,
}: {
  text: string;
  image: string;
  boxShadow: string;
  desc: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        borderRadius: "10px",
        padding: "1.5rem 1.5rem 2rem 1.5rem",
        flex: "1 1 calc(25% - 2rem)",
        width: { xs: "100%", md: "100%" },
        boxShadow: boxShadow,
        position: "relative",
        height: "100%",
      }}
    >
      {/* image */}
      <Box
        sx={{
          display: "flex",
          position: "absolute",
          right: { xs: "none", md: "50%" },
          top: { xs: "-3.5rem", md: "60%" },
          transform: { xs: "none", md: "translate(50%, -120%)" },
          borderRadius: { xs: "5px", md: "10px" },
          width: { xs: "120px", md: "250px" },
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
      <Box
        sx={{
          display: "flex",
          marginTop: { xs: "3rem", md: "8rem" },
          flexDirection: "column",
          gap: "0.5rem",
          padding: "0 1.5rem",
        }}
      >
        {/* text */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            color: "#142349",
            fontWeight: "700",
            width: "100%",
          }}
        >
          {text}
        </Typography>
        {/* description */}
        <Typography
          sx={{
            textAlign: "center",
            fontSize: { xs: "1rem", md: "1.2rem" },
            color: "#142349",
            width: "100%",
            padding: "0 1.5rem",
            fontWeight: "600",
          }}
        >
          {desc}
        </Typography>
      </Box>
    </Box>
  );
};

export default Domain;
