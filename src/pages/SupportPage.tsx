import { Box, CardMedia, Typography } from "@mui/material";
import BreadCrumb from "../components/BreadCrumb";
import EmailIcon from "@mui/icons-material/Email";
import { icons } from "../../assets/index";

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: "/home-lms",
  },
];

const SupportPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#EFF6FF",
        flexDirection: "column",
        height: "100%",
        minHeight: "100vh",
        width: "100%",
        padding: "20px",
        marginTop: "50px",
      }}
    >
      <BreadCrumb
        previousPages={breadcrumbPreviousPages}
        currentPageName="Support"
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          height: "100%",
        }}
      >
        {/* Heading */}
        <Typography
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "black",
          }}
        >
          Reach out to us
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            padding: "4rem",
            height: "100%",
            width: "60%",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          {/* description */}
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "semibold",
              color: "#8EA1B3",
              mb: "1rem",
              width: "80%",
              textAlign: "center",
            }}
          >
            If you're experiencing any issues, have found a bug, or simply have
            some suggestions or feedback you'd like to share, we're all ears!
            Your input is invaluable to us and helps make our platform better
            for everyone.
          </Typography>

          {/* Email us */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            {/* icon  */}
            <CardMedia
              component="img"
              image={icons.telegram}
              sx={{
                width: "50px",
                height: "50px",
              }}
            />

            <Typography
              sx={{
                fontSize: "1rem",
                fontWeight: "semibold",
                color: "black",
              }}
            >
              Reach out via Telegram
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SupportPage;
