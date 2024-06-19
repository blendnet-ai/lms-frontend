import React from "react";
import Domain from "../Components/Domain";
import { Box } from "@mui/material";
import data from "../data";

const topRowDomains = data.domains.slice(0, 4);
const bottomRowDomains = data.domains.slice(4, 7);

const Domains = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: { xs: "0rem", md: "0rem 8rem" },
        gap: { xs: "2rem", md: "6rem" },
      }}
    >
      {/* Top row with 4 cards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          width: "100%",
          gap: "2rem",
        }}
      >
        {topRowDomains.map((domain, idx) => (
          <Domain
            key={idx}
            text={domain.text}
            image={domain.image}
            bgColor={domain.bgColor}
          />
        ))}
      </Box>
      {/* Bottom row with 3 centered cards */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: "2rem",
        }}
      >
        {bottomRowDomains.map((domain, idx) => (
          <Domain
            key={idx}
            text={domain.text}
            image={domain.image}
            bgColor={domain.bgColor}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Domains;
