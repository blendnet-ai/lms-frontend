import { Box, CardMedia, Typography } from "@mui/material";

const Domain = ({
  text,
  image,
  boxShadow,
  maxWidth,
  desc,
}: {
  text: string;
  image: string;
  boxShadow: string;
  maxWidth: string;
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
      <Box
        sx={{
          marginTop: { xs: "3rem", md: "3rem" },
        }}
      >
        {/* text */}
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontSize: { xs: "1.2rem", md: "1.5rem" },
            color: "#142349",
            fontWeight: "600",
            width: "100%",
            maxWidth: maxWidth,
            // letterSpacing: "1px",
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
            // letterSpacing: "1px",
            // marginTop: { xs: "3rem", md: "5rem" },
          }}
        >
          {desc}
        </Typography>
      </Box>
    </Box>
  );
};

export default Domain;
