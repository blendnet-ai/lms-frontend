import { Box, Skeleton, Typography } from "@mui/material";
import { Card } from "../DSAPracticeReport";
import CustomCircularProgress from "../../../components/CustomCircularProgress/CustomCircularProgress";

type OverallScoreProps = {
  score?: number | null;
  feedback?: string | null;
};

export default function OverallScore(props: OverallScoreProps) {
  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "40px",
        }}
      >
        <Box>
          {props.score != null ? (
            <CustomCircularProgress
              color="#2059EE"
              textColor="#2059EE"
              colorOther="none"
              filledValue={props.score}
              innerValue={`${props.score}/100`}
              innerColor={"none"}
            />
          ) : (
            <Skeleton variant="circular" width={90} height={90} />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              color: "#2059EE",
              fontWeight: "550",
              fontSize: "20px",
            }}
          >
            Overall Score {props.score != null ? `${props.score}/100` : "?/100"}
          </Typography>

          {props.feedback ? (
            <Typography>{props.feedback}</Typography>
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={100} />
          )}
        </Box>
      </Box>
    </Card>
  );
}
