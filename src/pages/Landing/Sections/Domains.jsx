import React from "react";
import Domain from "../Components/Domain";
import { Box } from "@mui/material";
import data from "../data";
const Domains = () => {
  return (
    <Box
      sx={{
        width: "100%",
        gap: "2rem",
        display: "grid",
        padding: { xs: "1rem", md: "2rem 8rem" },
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" },
        rowGap: { xs: "1rem", md: "10rem" },
      }}
    >
      {data.domains.map((domain, idx) => (
        <Domain
          key={idx}
          text={domain.text}
          image={domain.image}
          bgColor={domain.bgColor}
        />
      ))}
    </Box>
  );
};

export default Domains;
