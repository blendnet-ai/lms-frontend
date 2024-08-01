import { Box, CardMedia, Skeleton, Typography } from "@mui/material";
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
        <CardMedia
          component="img"
          sx={{
            backgroundColor: "#E3FFF4",
            padding: "5px",
            width: "40px",
            height: "40px",
            borderRadius: "5px",
          }}
          src={icons.clipboardTick}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              color: "#00995B",
              fontWeight: "550",
              fontSize: "20px",
            }}
          >
            Correctness {props.score != null ? `${props.score}/50` : "?/50"}
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
