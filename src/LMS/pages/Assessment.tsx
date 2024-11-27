import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import EvalAPI from "../apis/EvalAPI";
import {
  Box,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Timer from "../../components/DSATest/components/Timer";
import QuestionNavigatorModal from "../modals/QuestionsNavigator";
import TagChip from "../helpers/TagChip";
import ConfirmationModal from "../modals/ConfirmationModal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Question {
  question?: string;
  topics: string[];
  options?: string[];
  image_url?: string | string[];
  paragraph?: string;
  questions?: [
    {
      question: string;
      options: string[];
    }
  ];
}

interface transformedListItem {
  section: string;
  question_id: number;
}

const Assessment = () => {
  // hooks
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // constatnts
  const heading = localStorage.getItem("assessmentData");
  const assessmentId = searchParams.get("id");

  // states
  const [question, setQuestion] = useState<Question>({
    question: "",
    topics: [],
    options: [],
  });
  const [transformedList, setTransformedList] = useState<transformedListItem[]>(
    []
  );
  const [totalAttemptedQuestionsMapping, setTotalAttemptedQuestionsMapping] =
    useState<Record<number, number>>({});
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const savedQuestion = localStorage.getItem("currentQuestion");
    return savedQuestion
      ? JSON.parse(savedQuestion)
      : { section: "", questionId: 0 };
  });

  // handleSelectedOption function for selection per question ID
  const handleSelectedOption = (option: number) => {
    setSelectedOption(option);
  };

  // Send the new route to the parent window
  useEffect(() => {
    // Send the new route to the parent window
    function getQueryParams(): string {
      const params = new URLSearchParams(window.location.search);
      const queryParams: string[] = [];
      for (const [key, value] of params.entries()) {
        queryParams.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        );
      }
      return queryParams.length > 0 ? `${queryParams.join("&")}` : "";
    }
    // Using postMessage with both path and query params
    window.parent.postMessage(
      {
        type: "ROUTE_CHANGE",
        route: location.pathname,
        queryParams: getQueryParams(), // Add query params here
      },
      "*"
    );
  }, [location]);

  // Retrieve questionList from localStorage
  useEffect(() => {
    const transformedList = localStorage.getItem("transformedQuestions");

    if (transformedList) {
      const parsedTransformedList = JSON.parse(transformedList).questions;
      setTransformedList(parsedTransformedList);

      // Set the first question if `currentQuestion` is not set in localStorage
      if (!localStorage.getItem("currentQuestion")) {
        setCurrentQuestion({
          section: parsedTransformedList[0]?.section,
          questionId: parsedTransformedList[0]?.question_id,
        });
        localStorage.setItem(
          "currentQuestion",
          JSON.stringify({
            section: parsedTransformedList[0]?.section,
            questionId: parsedTransformedList[0]?.question_id,
          })
        );
      }
    }
  }, []);

  // Fetch question based on current question and assessmentId
  useEffect(() => {
    const fetchQuestions = async () => {
      if (assessmentId && transformedList.length > 0) {
        try {
          const data = await EvalAPI.getQuestions(
            Number(assessmentId),
            currentQuestion.questionId
          );
          if (data) {
            setQuestion(data);
            // setSelectedOption(-1);
            const previouslyAttempted =
              totalAttemptedQuestionsMapping[currentQuestion.questionId];
            setSelectedOption(
              previouslyAttempted !== undefined ? previouslyAttempted : -1
            );
          }
        } catch (error) {
          console.error("Error fetching question:", error);
        }
      }
    };

    fetchQuestions();
  }, [
    assessmentId,
    currentQuestion,
    transformedList,
    totalAttemptedQuestionsMapping,
  ]);

  // Clear the localStorage when the timer is up
  const TimeUpHandler = () => {
    localStorage.removeItem("currentQuestion");
    localStorage.removeItem("assessmentData");
    localStorage.removeItem("transformedQuestions");
  };

  // End the assessment
  const handleEndAssessment = async () => {
    try {
      await EvalAPI.exitAssessment(Number(assessmentId));
      localStorage.removeItem("currentQuestion");
      localStorage.removeItem("assessmentData");
      localStorage.removeItem("transformedQuestions");

      // Send the new route to the parent window
      window.parent.postMessage(
        {
          type: "ROUTE_HOME",
          route: "",
        },
        "*"
      );
      // navigate react to home
      window.location.href = "/home-lms";
    } catch (error) {
      console.error("Error ending assessment:", error);
    }
  };

  // const handleClearResponse = () => {
  //   setSelectedOption(-1); // Clear the selected option
  //   // Optionally remove the attempted answer from the mapping
  //   const updatedAttemptedQuestionsMapping = {
  //     ...totalAttemptedQuestionsMapping,
  //   };
  //   delete updatedAttemptedQuestionsMapping[currentQuestion.questionId];
  //   setTotalAttemptedQuestionsMapping(updatedAttemptedQuestionsMapping); // Update the state
  // };

  // submit individual answer
  const submitAnswer = async () => {
    if (assessmentId && currentQuestion.questionId && selectedOption >= 0) {
      try {
        await EvalAPI.submitAnswer(
          Number(assessmentId),
          currentQuestion.questionId,
          selectedOption.toString(),
          1
        );
        setTotalAttemptedQuestionsMapping((prev) => ({
          ...prev,
          [currentQuestion.questionId]: selectedOption,
        }));
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    }
  };

  // Modal configs
  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const handleQuestionModalOpen = () => setOpenQuestionModal(true);
  const handleQuestionModalClose = () => setOpenQuestionModal(false);

  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const handleConfirmationModalOpen = () => setOpenConfirmationModal(true);
  const handleConfirmationModalClose = () => setOpenConfirmationModal(false);

  // handle navigation to previous question
  const handlePrevious = () => {
    const currentIndex = transformedList.findIndex(
      (item) =>
        item.section === currentQuestion.section &&
        item.question_id === currentQuestion.questionId
    );

    if (currentIndex > 0) {
      const previousQuestion = transformedList[currentIndex - 1];
      setCurrentQuestion({
        section: previousQuestion.section,
        questionId: previousQuestion.question_id,
      });
      localStorage.setItem(
        "currentQuestion",
        JSON.stringify({
          section: previousQuestion.section,
          questionId: previousQuestion.question_id,
        })
      );
    }
  };

  // handle navigation to next question
  const handleNext = () => {
    const currentIndex = transformedList.findIndex(
      (item) =>
        item.section === currentQuestion.section &&
        item.question_id === currentQuestion.questionId
    );

    if (selectedOption >= 0) {
      submitAnswer();
    }

    // to go to the next question
    if (currentIndex < transformedList.length - 1) {
      const nextQuestion = transformedList[currentIndex + 1];
      setCurrentQuestion({
        section: nextQuestion.section,
        questionId: nextQuestion.question_id,
      });
      localStorage.setItem(
        "currentQuestion",
        JSON.stringify({
          section: nextQuestion.section,
          questionId: nextQuestion.question_id,
        })
      );
    }
  };

  // fetch attempted questions
  useEffect(() => {
    const assessmentState = async () => {
      const data = await EvalAPI.getState(Number(assessmentId));
      if (data && data.attempted_questions.length > 0) {
        const attemptedQuestions = data.attempted_questions;

        const attemptedQuestionsMap = attemptedQuestions.reduce(
          (acc: any, curr: any) => {
            acc[curr.question_id] = curr.mcq_answer;
            return acc;
          },
          {}
        );

        console.log("attemptedQuestionsMap", attemptedQuestionsMap);
        setTotalAttemptedQuestionsMapping(attemptedQuestionsMap);
      }
    };

    if (assessmentId) assessmentState();
  }, [assessmentId]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          backgroundColor: "#EFF6FF",
          padding: "20px",
          mt: "3.5rem",
        }}
      >
        {/* top panel  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "10px",
            width: "100%",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              color: "#000",
              fontSize: "1.5rem",
            }}
          >
            {heading}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            {/* timer  */}
            <Timer
              assessmentId={Number(assessmentId)}
              submitSolution={TimeUpHandler}
              ApiClass={EvalAPI}
              navigationUrl="/fetch-individual-scorecard?assessment_id?assessment_id"
            />
            {/* button  */}
            <Button
              sx={{
                borderRadius: "10px",
                backgroundColor: "#2059EE",
                color: "white",
              }}
              onClick={handleQuestionModalOpen}
              variant="contained"
            >
              Question Navigator
            </Button>
            <Button
              sx={{
                borderRadius: "10px",
                backgroundColor: "#ED5050",
                color: "white",
                "&:hover": {
                  backgroundColor: "#ED5050",
                },
              }}
              onClick={handleConfirmationModalOpen}
            >
              Submit
            </Button>
          </Box>
        </Box>

        {/* middle panel  */}
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
            onClick={handlePrevious}
            disabled={
              transformedList.findIndex(
                (item) =>
                  item.section === currentQuestion.section &&
                  item.question_id === currentQuestion.questionId
              ) === 0
            }
          >
            <ArrowBackIcon />
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
            {transformedList.findIndex(
              (item) =>
                item.section === currentQuestion.section &&
                item.question_id === currentQuestion.questionId
            ) + 1}
          </Typography>

          <IconButton
            onClick={handleNext}
            disabled={
              transformedList.findIndex(
                (item) =>
                  item.section === currentQuestion.section &&
                  item.question_id === currentQuestion.questionId
              ) ===
              transformedList.length - 1
            }
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
        {/* question data  */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "20px",
            border: "1px solid #CFE4FF",
            borderRadius: "0px 0px 10px 10px",
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
            }}
          >
            {/* question index  */}
            <Typography
              sx={{
                color: "#000",
                fontSize: "1.5rem",
              }}
            >
              Question:{" "}
              {transformedList.findIndex(
                (item) =>
                  item.section === currentQuestion.section &&
                  item.question_id === currentQuestion.questionId
              ) + 1}
            </Typography>
            <TagChip title={currentQuestion.section} />
          </Box>

          {/* if question is present, display it */}
          {question && (
            <Typography sx={{ color: "black", fontSize: "1.2rem" }}>
              {question.question}
            </Typography>
          )}

          {/* if image is present, display them */}
          {question.image_url && question.image_url.length > 0 && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
            >
              {Array.isArray(question.image_url) &&
                question.image_url.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="question"
                    style={{ width: "80%", height: "auto" }}
                  />
                ))}
            </Box>
          )}

          {/* if question and options are present, display them */}
          {question && question.options && (
            <ToggleButtonGroup
              orientation="vertical"
              exclusive
              sx={{
                minWidth: "200px",
                maxWidth: "400px",
                gap: "10px",
              }}
              value={selectedOption}
              onChange={(_, newSelectedOption) =>
                handleSelectedOption(newSelectedOption)
              }
            >
              {question.options.map((option, index) => (
                <ToggleButton
                  value={index}
                  key={index}
                  color="primary"
                  sx={{
                    color: "black",
                    padding: "10px",
                    textAlign: "left",
                    backgroundColor: "#fff",
                    transition: "all 0.3s",
                    "&.Mui-selected": {
                      backgroundColor: "#2059EE",
                      color: "#fff",
                    },
                  }}
                >
                  {option}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}

          {/* if paragraph is present, display it */}
          {question.paragraph && (
            <Typography sx={{ color: "black", fontSize: "1.2rem" }}>
              {question.paragraph}
            </Typography>
          )}

          {/* if multiple questions are present, display them */}
          {question.questions && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {question.questions.map((q, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    mb: "10px",
                  }}
                >
                  <Typography sx={{ color: "black", fontSize: "1.2rem" }}>
                    {index + 1}. {q.question}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                      ml: "20px",
                    }}
                  >
                    {q.options.map((option, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          sx={{
                            color: "black",
                          }}
                          variant="outlined"
                        >
                          {option}
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {/* clear resonse button */}
          {/* <Button
            color="info"
            variant="outlined"
            sx={{
              width: "100%",
              maxWidth: "400px",
            }}
            onClick={handleClearResponse}
            disabled={
              !totalAttemptedQuestionsMapping[currentQuestion.questionId]
            }
          >
            Clear Response
          </Button> */}

          <Button
            sx={{
              ml: "auto",
            }}
            variant="outlined"
            onClick={handleNext}
            disabled={
              transformedList.findIndex(
                (item) =>
                  item.section === currentQuestion.section &&
                  item.question_id === currentQuestion.questionId
              ) ===
              transformedList.length - 1
            }
          >
            Next
          </Button>
        </Box>
      </Box>

      {/* Question Navigator Modal */}
      <QuestionNavigatorModal
        currentQuestion={currentQuestion}
        setCurrentQuestion={(newQuestion) => {
          setCurrentQuestion(newQuestion);
          localStorage.setItem("currentQuestion", JSON.stringify(newQuestion));
        }}
        open={openQuestionModal}
        close={handleQuestionModalClose}
        transformedQuestionsList={transformedList}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={openConfirmationModal}
        close={handleConfirmationModalClose}
        submit={handleEndAssessment}
      />
    </>
  );
};

export default Assessment;
