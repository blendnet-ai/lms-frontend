import { icons } from "../../../assets";
import { Card } from "./Card";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { QuestionObject } from "../apis/MockInterviewApi";

type QuestionAnalysisProps = {
  questionData: QuestionObject[] | [];
};

const QuestionAnalysis = (props: QuestionAnalysisProps) => {
  return (
    <Card
      styles={{
        padding: "0 60px 60px 60px",
        marginTop: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          padding: "40px 20px",
          border: "1px solid #CFE4FF",
          boxShadow: "0px 4px 4px 0px #00000040",
          borderRadius: "10px",
        }}
      >
        {/* title */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <CardMedia
            component="img"
            image={icons.questionAnalysis}
            sx={{
              width: "30px",
              height: "30px",
            }}
            alt="Question Analysis Icon"
          />
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#2059EE",
            }}
          >
            Question Analysis
          </Typography>
        </Box>

        {/* questions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {props.questionData.length > 0 ? (
            props.questionData.map((question, index) => (
              <Accordion key={index}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index + 1}-content`}
                  id={`panel${index + 1}-header`}
                >
                  <Typography
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#2059EE",
                    }}
                  >
                    Question {index + 1} - {question.question_text}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#000",
                    }}
                  >
                    Your Response
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "semibold",
                      color: "#000",
                    }}
                  >
                    {question.user_response}
                  </Typography>
                </AccordionDetails>
                <AccordionDetails>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "bold",
                      color: "#000",
                    }}
                  >
                    Ideal Response
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: "semibold",
                      color: "#000",
                    }}
                  >
                    {question.ideal_response}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={100} />
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default QuestionAnalysis;
