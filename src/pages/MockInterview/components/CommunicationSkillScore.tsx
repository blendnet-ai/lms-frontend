import { Box, Skeleton, Typography } from "@mui/material";
import CustomCircularProgress from "../../../components/CustomCircularProgress/CustomCircularProgress";
import { Card } from "./Card";

type CommunicationScoreProps = {
  score?: number | null;
  feedback?: string | null;
};

export default function CommunicationScore(props: CommunicationScoreProps) {
  return (
    <Card
      styles={{
        padding: "40px",
      }}
    >
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
              innerValue={`${Math.round(props.score)}/100`}
              innerColor={"none"}
              circleSize={150}
            />
          ) : (
            <Skeleton variant="circular" width={160} height={160} />
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
              fontWeight: "600",
              fontSize: "26px",
            }}
          >
            Communication Skills:{" "}
            {props.score != null ? `${Math.round(props.score)}/100` : "?/100"}
          </Typography>

          {props.feedback ? (
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "500",
                color: "#000000",
                lineHeight: "24px",
              }}
            >
              {props.feedback}
            </Typography>
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={100} />
          )}
        </Box>
      </Box>
    </Card>
  );
}
