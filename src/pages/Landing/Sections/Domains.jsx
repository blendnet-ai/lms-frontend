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
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: "1fr 1fr 1fr",
          rowGap: "10rem",
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

      {/* domains on mobile  */}

      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          flexDirection: "row",
          overflowX: "scroll",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          padding: "4rem 0 0 1rem",
        }}
      >
        {data.domains.map((domain, idx) => (
          <Box
            sx={{
              flex: "0 0 70%",
              scrollSnapAlign: "start",
              padding: "0 1rem",
            }}
          >
            <Domain
              key={idx}
              text={domain.text}
              image={domain.image}
              boxShadow={domain.boxShadow}
              maxWidth={domain.maxWidth}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Domains;
