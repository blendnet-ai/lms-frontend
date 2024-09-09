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
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "150px", md: "150px" },
            height: { xs: "150px", md: "150px" },
            objectFit: "contain",
            borderRadius: "20px",
            border: `2px solid ${borderColor}`,
            boxShadow: `${borderColor} 0px 4px 12px, ${borderColor} 0px 8px 36px, ${borderColor} 0px 16px 48px`,
            padding: "0.5rem",
          }}
          image={img}
          alt="feature card 1"
        />
      </Box>
      {/* heading  */}
      <Typography
        variant="h4"
        sx={{
          fontSize: { xs: "1.2rem", md: "24px" },
          color: "#142349",
          fontWeight: "700",
          letterSpacing: "2%",
        }}
      >
        {title}
      </Typography>

      {/* description  */}
      <Typography
        sx={{
          fontSize: { xs: "1rem", md: "20px" },
          color: "#142349",
          fontWeight: "400",
          letterSpacing: "2%",
          width: descWidth,
        }}
      >
        {desc}
      </Typography>
    </Box>
  );
};

export default FeatureCard;
