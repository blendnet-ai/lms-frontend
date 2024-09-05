import { Box, CardMedia, Typography } from "@mui/material";

type MarginTop = { xs: string; md: string };

const FeatureCard = ({
  title,
  img,
  desc,
  top,
  right,
  descWidth = "100%",
  mTop = { xs: "100px", md: "120px" },
}: {
  title: string;
  img: string;
  desc: string;
  top: string;
  right: string;
  descWidth?: string;
  mTop?: MarginTop;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        position: "relative",
        padding: { xs: "1rem", md: "2rem 2.5rem" },
        borderRadius: "20px",
        boxShadow: "0px 0px 30.2px 0px #32558930",
      }}
    >
      {/* image float right */}
      <CardMedia
        component="img"
        sx={{
          width: { xs: "150px", md: "300px" },
          height: { xs: "150px", md: "300px" },
          objectFit: "contain",
          position: { xs: "absolute", md: "absolute" },
          top: top,
          right: right,
        }}
        image={img}
        alt="feature card 1"
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          marginTop: mTop,
          gap: "1rem",
        }}
      >
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
            fontSize: { xs: "1rem", md: "22px" },
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
