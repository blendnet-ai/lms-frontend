import { Box, CircularProgress } from "@mui/material";



const CustomCircularProgress = ({
  filledValue,
  innerValue,
  innerColor,
}) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        thickness={5}
        size={100}
        value={filledValue}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: innerColor ,
            width: "100%",
            borderRadius: "100px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {innerValue}
        </div>
      </Box>
    </Box>
  );
};

export default CustomCircularProgress;
