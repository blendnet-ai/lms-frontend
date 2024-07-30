import { Box, Skeleton, Typography } from "@mui/material";
import { Card } from "../DSAPracticeReport";
import { icons } from "../../../assets";

type ImprovementsAndFeedbackProps = {
  score?: number | null;
  feedback?: string | null;
};

export default function ImprovementsAndFeedback(
  props: ImprovementsAndFeedbackProps
) {
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
        <img src={icons.messageEdit} alt="" />
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
            Improvements and Feedback:{" "}
            {props.score ? `${props.score}/20` : "?/20"}
          </Typography>

          {props.feedback ? (
            <Typography>{props.feedback}</Typography>
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={50} />
          )}
        </Box>
      </Box>
    </Card>
  );
}
