import React from "react";
import Domain from "../Components/Domain";
import { Box } from "@mui/material";
import data from "../data";
const Domains = ({ maxWidth, outerPadding }) => {
  return (
    <Box
      sx={{
        padding: outerPadding,
        width: "100%",
      }}
    >
      <Box
        sx={{
          gap: "2rem",
          display: "grid",
          // padding: { xs: "1rem", md: "2rem 8rem", lg: "2rem 16rem" },
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
          rowGap: { xs: "1rem", md: "10rem" },
          maxWidth: maxWidth,
          margin: "auto",
        }}
      >
        {data.domains.map((domain, idx) => (
          <Domain
            key={idx}
            text={domain.text}
            image={domain.image}
            boxShadow={domain.boxShadow}
            maxWidth={domain.maxWidth}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Domains;
