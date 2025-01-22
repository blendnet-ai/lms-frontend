import { Box, Typography } from "@mui/material";
import BreadCrumb from "../components/BreadCrumb";
import EmailIcon from "@mui/icons-material/Email";
import { ROUTES } from "../configs/routes";

const breadcrumbPreviousPages = [
  {
    name: "Home",
    route: ROUTES.HOME,
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
            width: "55%",
            backgroundColor: "white",
            borderRadius: "10px",
          }}
        >
          {/* description */}
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "400",
              color: "#142349",
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
              flexDirection: "column",
              justifyContent: "center",
              gap: "1rem",
              width: "80%",
            }}
          >
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
                  width: "1.5rem",
                  height: "1.5rem",
                  color: "#2059EE",
                }}
              />

              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "semibold",
                  color: "black",
                }}
              >
                For <strong>technical support</strong>, you can reach out to us
                at{" "}
                <strong
                  style={{ textDecoration: "underline", color: "#2059EE" }}
                >
                  contact@sakshm.com
                </strong>
              </Typography>
            </Box>
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
                  width: "1.5rem",
                  height: "1.5rem",
                  color: "#2059EE",
                }}
              />
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: "semibold",
                  color: "black",
                }}
              >
                For any <strong>course-related queries</strong>, please contact{" "}
                <strong
                  style={{ textDecoration: "underline", color: "#2059EE" }}
                >
                  support@orbitskilling.com
                </strong>{" "}
                or <strong style={{ color: "#2059EE" }}>+9173049 34568</strong>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SupportPage;
