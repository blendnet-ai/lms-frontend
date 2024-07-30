import { Box, Skeleton, Typography } from "@mui/material";
import { Card } from "../DSAPracticeReport";
import { icons } from "../../../assets";

type CorrectnessProps = {
  score?: number | null;
  feedback?: string | null;
};

export default function Correctness(props: CorrectnessProps) {
  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "flex-start",
        }}
      >
        <img src={icons.clipboardTick} alt="" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              color: "#2059EE",
              fontWeight: "550",
              fontSize: "20px",
            }}
          >
            Correctness {props.score != null ? `${props.score}/40` : "?/40"}
          </Typography>
          {props.feedback ? (
            <Typography>{props.feedback}</Typography>
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={25} />
          )}
        </Box>
      </Box>
    </Card>
  );
}
