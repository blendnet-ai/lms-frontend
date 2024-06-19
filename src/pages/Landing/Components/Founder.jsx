import { Box, CardMedia, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FounderSectionIllustration from "./FounderSectionIllustration";
const Founder = ({
  name,
  image,
  about,
  illustrationImage,
  text,
  highlightWords,
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
            border: "10px solid #E7EDFF",
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
      <FounderSectionIllustration
        image={illustrationImage}
        text={text}
        highlightWords={highlightWords}
      />
    </Box>
  );
};

export default Founder;
