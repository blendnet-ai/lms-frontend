import { Box, CardMedia, Skeleton, Typography } from "@mui/material";
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
          width: "100%",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            backgroundColor: "#FFEDDD",
            padding: "5px",
            width: "40px",
            height: "40px",
            borderRadius: "5px",
          }}
          src={icons.messageEdit}
        />
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
              color: "#FF6905",
              fontWeight: "550",
              fontSize: "20px",
            }}
          >
            Improvements and Feedback:{" "}
            {props.score != null ? `${props.score}/20` : "?/20"}
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
