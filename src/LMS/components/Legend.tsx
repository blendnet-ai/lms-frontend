import { Box, Typography } from "@mui/material";

interface LegendProps {
  size: number;
  title: string;
  legendColor: string;
}

const Legend = (props: LegendProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Typography
        sx={{
          height: `${props.size}px`,
          width: `${props.size}px`,
          backgroundColor: props.legendColor,
        }}
      />
      <Typography
        sx={{
          fontSize: "16px",
          color: "#333",
        }}
      >
        {props.title}
      </Typography>
    </Box>
  );
};

export default Legend;
