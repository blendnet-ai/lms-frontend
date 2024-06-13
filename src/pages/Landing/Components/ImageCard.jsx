import { Box, CardMedia, Typography } from "@mui/material";
import { images } from "../../../assets/index";
const ImageCard = ({ name, image, about }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "1rem",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* image  */}
      <CardMedia
        component="img"
        sx={{
          height: { xs: "300px", md: "200px" },
          objectFit: "contain",
          borderRadius: "10px",
        }}
        image={image}
        alt="landing page image"
      />
      {/* about  */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "absolute",
          zIndex: "100",
          backgroundImage: `url(${images.backgroundLanding})`,
          padding: "1rem",
          bottom: "-1.5rem",
          width: { xs: "60%", md: "80%" },
          borderRadius: "10px",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "1rem",
            color: "#3366FF",
            fontWeight: "600",
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: "0.8rem",
            color: "#142349",
          }}
        >
          {about}
        </Typography>
      </Box>
    </Box>
  );
};

export default ImageCard;
