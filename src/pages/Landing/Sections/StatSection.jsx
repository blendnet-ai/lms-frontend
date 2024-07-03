import { Box } from "@mui/material";
import React from "react";
import Stats from "../Components/Stats";

const StatSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: "0rem", md: "0rem 8rem" },
        margin: { xs: "2rem 0rem", md: "4rem 0rem" },
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
        }}
      >
        <Stats count="5K" text="HIRING PARTNERS" />
        <Stats count="10" text="PLACEMENTS" />
        <Stats count="10K" text="STUDENTS ENROLLED" />
        <Stats count="50" text="COLLEGE PARTNERS" />
      </Box>
    </Box>
  );
};

export default StatSection;
