import { Backdrop, Box, Fade, Modal, Typography } from "@mui/material";

type QuestionNavigatorModalProps = {
  open: boolean;
  close: () => void;
  currentQuestion: {
    section: number;
    questionId: number;
  };
  setCurrentQuestion: ({ section, questionId }: any) => void;
  transformedQuestionsList: any;
  attemptedQuestionsMapping: any;
};

const QuestionNavigatorModal = (props: QuestionNavigatorModalProps) => {
  const handleNavigatorClick = (section: string, questionId: number) => {
    props.setCurrentQuestion({ section, questionId });
    localStorage.setItem(
      "currentQuestion",
      JSON.stringify({ section, questionId })
    );
    props.close();
  };

  return (
    <Modal
      aria-labelledby="question-navigator-modal-title"
      aria-describedby="question-navigator-modal-description"
      open={props.open}
      onClose={props.close}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={props.open}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "max-content",
            maxWidth: "700px",
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 4px 0px #205EFF26",
            p: 4,
            borderRadius: 2,
          }}
        >
          {/* question list  */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(10, 1fr)",
              gap: "10px",
              width: "min-content",
              marginTop: "20px",
            }}
          >
            {props.transformedQuestionsList.map(
              (
                question: { question_id: number; section: string },
                index: number
              ) => {
                const isCurrentQuestion =
                  question.question_id === props.currentQuestion.questionId;
                const isAttempted =
                  props.attemptedQuestionsMapping[question.question_id];
                return (
                  <Box
                    key={index}
                    sx={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "1rem",
                      backgroundColor: isCurrentQuestion
                        ? "#2059EE"
                        : isAttempted
                        ? "#4CAF50"
                        : "#E0E0E0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                      color: isCurrentQuestion ? "white" : "black",
                    }}
                    onClick={() =>
                      handleNavigatorClick(
                        question.section,
                        question.question_id
                      )
                    }
                  >
                    <Typography>
                      {index !== null && index !== undefined ? index + 1 : ""}
                    </Typography>
                  </Box>
                );
              }
            )}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default QuestionNavigatorModal;
