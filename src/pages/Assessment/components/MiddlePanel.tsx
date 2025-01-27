import { Box, IconButton, Typography } from "@mui/material";
import { MoveLeft, MoveRight } from "lucide-react";

interface MiddlePanelProps {
  handlePrevious: () => void;
  handleNext: () => void;
  transformedList: any;
  currentQuestion: any;
}

const MiddlePanel = (props: MiddlePanelProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "10px",
        backgroundColor: "#fff",
        border: "1px solid #CFE4FF",
        borderRadius: "10px 10px 0px 0px",
      }}
    >
      <IconButton
        onClick={props.handlePrevious}
        disabled={
          props.transformedList.findIndex(
            (item: { section: any; question_id: any }) =>
              item.section === props.currentQuestion.section &&
              item.question_id === props.currentQuestion.questionId
          ) === 0
        }
      >
        <MoveLeft />
      </IconButton>

      {/* question index  */}
      <Typography
        sx={{
          color: "#fff",
          fontSize: "1rem",
          padding: "5px 10px",
          borderRadius: "50%",
          backgroundColor: "#000",
        }}
      >
        {props.transformedList.findIndex(
          (item: { section: any; question_id: any }) =>
            item.section === props.currentQuestion.section &&
            item.question_id === props.currentQuestion.questionId
        ) + 1}
      </Typography>

      <IconButton
        onClick={props.handleNext}
        disabled={
          props.transformedList.findIndex(
            (item: { section: any; question_id: any }) =>
              item.section === props.currentQuestion.section &&
              item.question_id === props.currentQuestion.questionId
          ) ===
          props.transformedList.length - 1
        }
      >
        <MoveRight />
      </IconButton>
    </Box>
  );
};

export default MiddlePanel;
