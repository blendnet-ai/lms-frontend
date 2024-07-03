import { Box, CardMedia, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Founder = ({
  name,
  image,
  about,
  illustrationImage,
  text,
  heading,
  borderColour,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8rem",
        alignItems: "center",
      }}
    >
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
            borderRadius: "15px",
            border: `10px solid ${borderColour}`,
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
            zIndex: "10",
            backgroundColor: "white",
            padding: "1rem",
            bottom: "calc(-40%)",
            borderRadius: "10px",
            boxShadow: "0px 0px 22.8px 0px #4A6EA54F",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: "1rem",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: "1rem",
                color: "black",
                fontWeight: "600",
              }}
            >
              {name}
            </Typography>
            <LinkedInIcon sx={{ fontSize: "1.5rem", color: "#006699" }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              fontSize: "0.8rem",
              color: "#142349",
            }}
          >
            {about}
          </Typography>
        </Box>
      </Box>

      {/* Middle image and text */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
          height: "100%",
        }}
      >
        {/* illustration */}
        <CardMedia
          component="img"
          sx={{
            display: { xs: "none", md: "block" },
            width: "100px",
            height: "100px",
            objectFit: "contain",
          }}
          image={illustrationImage}
          alt="Mentoring illustration"
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: { xs: "1rem", md: "1rem 3rem" },
            justifyContent: "center",
            backgroundColor: "white",
            borderRadius: "10px",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            height: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem",
              color: "#31A97B",
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {heading}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem",
              color: "#142349",
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            {text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Founder;
