import { Box, CardMedia, Typography } from "@mui/material";
import BreadCrumb from "../components/BreadCrumb";
import EmailIcon from "@mui/icons-material/Email";
import { icons } from "../assets/index";
import { Link } from "react-router-dom";

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

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "1rem",
              width: "100%",
            }}
          >
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
              <EmailIcon
                sx={{
                  fontSize: "3rem",
                  color: "#2059EE",
                  borderRadius: "50%",
                  border: "1px solid #2059EE",
                  padding: "0.5rem",
                }}
              />

              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "semibold",
                  color: "black",
                }}
              >
                Reach out via{" "}
                <Link
                  to={""}
                  style={{
                    color: "#2059EE",
                    // fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  email
                </Link>
              </Typography>
            </Box>

            {/* Telegram */}
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
                Reach out via{" "}
                <Link
                  to={""}
                  style={{
                    color: "#2059EE",
                    // fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  telegram
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SupportPage;
