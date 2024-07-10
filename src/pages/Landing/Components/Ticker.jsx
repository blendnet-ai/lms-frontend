import React from "react";
import { Box, CardMedia, keyframes } from "@mui/material";
import PropTypes from "prop-types";

const Ticker = ({ partnersImage, maxWidth, outerPadding }) => {
  const slide = keyframes`
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  `;

  return (
    <Box
      sx={{
        overflow: "hidden",
        // width: { xs: "100%", md: "1200px" },
        width: "100%",
        position: "relative",
        whiteSpace: "nowrap",
        padding: outerPadding,
        // padding: { xs: "0 1rem", md: "0" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          position: "relative",
          maxWidth: maxWidth,
          margin: "auto",
        }}
      >
        <CardMedia
          component="img"
          image={partnersImage}
          sx={{
            width: "auto",
            objectFit: "cover",
            height: "100px",
            display: "inline-block",
            animation: `50s ${slide} infinite linear`,
            userSelect: "none",
          }}
        />
        <CardMedia
          component="img"
          image={partnersImage}
          sx={{
            width: "auto",
            objectFit: "cover",
            height: "100px",
            display: "inline-block",
            animation: `50s ${slide} infinite linear`,
            userSelect: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            width: "10%",
            background: "linear-gradient(to right, white, transparent)",
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            width: "10%",
            background: "linear-gradient(to left, white, transparent)",
            pointerEvents: "none",
          }}
        />
      </Box>
    </Box>
  );
};

Ticker.propTypes = {
  partnersImage: PropTypes.string.isRequired,
};

export default Ticker;
