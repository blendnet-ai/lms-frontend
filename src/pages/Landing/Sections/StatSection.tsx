import { Box } from "@mui/material";
import Stats from "../Components/Stats";

const StatSection = ({ maxWidth }: { maxWidth: string }) => {
  return (
    <Box
      sx={{
        width: "100%",
        margin: { xs: "0rem 0rem", md: "1rem 0rem" },
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
          padding: "2rem",
          maxWidth: maxWidth,
          margin: "auto",
        }}
      >
        <Stats count={5} countSuffix="K" text="Active Learners" />
        <Stats count={17} countSuffix="K" text="Doubts Solved By Disha" />
        <Stats count={14} countSuffix="K" text="Learning Hours" />
        <Stats count={500} countSuffix="" text="Problem Sets" />
      </Box>
    </Box>
  );
};

export default StatSection;
