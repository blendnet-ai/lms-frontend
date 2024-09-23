import { Box, CardMedia, IconButton, Link, Typography } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Founder = ({
  name,
  linkedInUrl,
  image,
  about1,
  about2,
  about3,
  borderColour,
}: {
  name: string;
  linkedInUrl: string;
  image: string;
  about1: string;
  about2: string;
  about3: string;
  illustrationImage: string;
  text: string;
  heading: string;
  borderColour: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* image  */}
        <CardMedia
          component="img"
          sx={{
            height: { xs: "100%", md: "320px" },
            objectFit: "contain",
            borderRadius: { xs: "20px", md: "15px" },
            border: `15px solid ${borderColour}`,
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
            bottom: { xs: "-6rem", md: "-6rem" },
            borderRadius: "10px",
            boxShadow: "0px 0px 22.8px 0px #4A6EA54F",
            width: { xs: "100%", md: "320px" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontSize: { xs: "16px", md: "20px" },
                color: "black",
                fontWeight: "700",
              }}
            >
              {name}
            </Typography>
            <Link href={linkedInUrl}>
              <LinkedInIcon
                sx={{
                  fontSize: { xs: "20px", md: "2rem" },
                  color: "#006699",
                }}
              />
            </Link>
          </Box>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: "14px", md: "16px" },
              fontWeight: "600",
              color: "#142349",
            }}
          >
            {about1}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: { xs: "14px", md: "16px" },
              fontWeight: "600",
              color: "#142349",
            }}
          >
            {about2}
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: { xs: "14px", md: "16px" },
              color: "#142349",
            }}
          >
            {about3}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Founder;
