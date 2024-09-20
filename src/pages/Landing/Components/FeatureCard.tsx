import { Box, CardMedia, Typography } from "@mui/material";

const FeatureCard = ({
  title,
  img,
  desc,
  descWidth = "100%",
  borderColor,
}: {
  title: string;
  img: string;
  desc: string;
  descWidth?: string | {};
  mTop?: string | {};
  borderColor?: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        position: "relative",
        padding: { xs: "1rem", md: ".5rem 0.5rem 2rem 2.5rem" },
        borderRadius: "20px",
        boxShadow: "0px 0px 30.2px 0px #32558930",
      }}
    >
      {/* top right image container  */}
      <Box
        sx={{
          position: "relative",
          top: "-3rem",
          right: 0,
          height: "100px",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            position: "absolute",
            top: "0",
            right: "0",
            width: { xs: "150px", md: "150px" },
            height: { xs: "150px", md: "150px" },
            objectFit: "contain",
          }}
          image={img}
          alt="feature card 1"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {/* heading  */}
        <Typography
          sx={{
            fontSize: { xs: "1.2rem", md: "20px" },
            color: "#142349",
            fontWeight: "700",
            letterSpacing: "normal",
          }}
        >
          {title}
        </Typography>

        {/* description  */}
        <Typography
          sx={{
            fontSize: { xs: "1rem", md: "18px" },
            color: "#142349",
            fontWeight: "400",
            letterSpacing: "2%",
            width: descWidth,
          }}
        >
          {desc}
        </Typography>
      </Box>
    </Box>
  );
};

export default FeatureCard;
