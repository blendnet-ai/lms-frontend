import { Box, CardMedia, IconButton, Link, Typography } from "@mui/material";
import React from "react";
import { images } from "../../../assets";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const LandingFooter = ({ outerPadding, maxWidth }) => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: outerPadding,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: maxWidth,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100px",
              objectFit: "contain",
            }}
            image={images.sakshamLogo}
            alt="logo"
          />
          <Box>
            <IconButton
              color="primary"
              aria-label="LinkedIn"
              onClick={() => {
                window.location.href =
                  "https://www.linkedin.com/company/blendnetai/";
              }}
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton color="info" aria-label="Twitter">
              <TwitterIcon />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: { xs: "1rem", md: "2rem" },
              fontSize: { xs: "0.8rem", md: "1rem" },
              fontWeight: "600",
              width: { xs: "100%", md: "max-content" },
            }}
          >
            <Link
              sx={{
                color: "#142349",
              }}
              href="/privacy-policy"
            >
              {" "}
              Privacy policy
            </Link>
            <Link
              sx={{
                color: "#142349",
              }}
              href="/terms-of-use"
            >
              {" "}
              Terms of use
            </Link>
            <Link
              sx={{
                color: "#142349",
              }}
              href="/refund-policy"
            >
              {" "}
              Refund policy
            </Link>
          </Box>
          <Typography
            sx={{
              color: "#142349",
              width: "max-content",
              fontWeight: "600",
            }}
          >
            Copyright © 2024 Blendnet Tech Solutions Pvt Ltd
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LandingFooter;
