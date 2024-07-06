import { Box } from "@mui/material";
import React from "react";
import Stats from "../Components/Stats";

const StatSection = ({ maxWidth, outerPadding }) => {
  return (
    <Box
      sx={{
        width: "100%",
        // padding: { xs: "0rem", md: "0rem 8rem" },
        margin: { xs: "2rem 0rem", md: "4rem 0rem" },
        padding: outerPadding,
      }}
    >
      <Box
        sx={{
          gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr" },
          gap: "2rem",
          flexDirection: "row",
          justifyContent: "space-between",
          display: { xs: "grid", md: "flex" },
          border: "1px solid white",
          borderRadius: "10px",
          boxShadow: {
            xs: "none",
            md: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          },
          padding: "2rem",
          maxWidth: maxWidth,
          margin: "auto",
        }}
      >
        <Stats count="5K" text="Students Enrolled" />
        <Stats count="10" text="Skilling Partners" />
        <Stats count="10K" text="Learning Hours" />
        <Stats count="50" text="Hiring Partners" />
      </Box>
    </Box>
  );
};

export default StatSection;
