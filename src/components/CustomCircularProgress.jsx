import { Box, CircularProgress } from "@mui/material";

const CustomCircularProgress = ({ filledValue, innerValue, innerColor }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        thickness={5}
        size={90}
        value={filledValue}
        style={{
          color: "#FE5E7E",
          borderRadius: "100px",
          backgroundColor: "#FEDFE5",
          scale: "-1 1",
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: innerColor,
            width: "100%",
            borderRadius: "100px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "20px",
            backgroundColor: "white",
          }}
        >
          {innerValue}
        </div>
      </Box>
    </Box>
  );
};

export default CustomCircularProgress;
