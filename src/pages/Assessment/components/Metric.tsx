import { Box, Typography } from "@mui/material";
import { AssessmentResultSection, Metric } from "../../../apis/LmsAPI";

interface MetricProps {
  data: Metric;
}

const MetricChip = (props: MetricProps) => {
  console.log("MetricChip props:", props);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "10px",
        backgroundColor: "#EFF6FF",
        borderRadius: "5px",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "black",
        }}
      >
        {props.data.name}
      </Typography>

      <Typography
        sx={{
          fontSize: "1rem",
          color: "black",
        }}
      >
        {props.data.obtained_score} /10
      </Typography>
    </Box>
  );
};

export default MetricChip;
