import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import QuestionNavigatorModal from "../modals/QuestionsNavigator";
import ConfirmationModal from "../modals/ConfirmationModal";
import EvalAPI from "../apis/EvalAPI";
import TagChip from "../helpers/TagChip";
import TopPanel from "../components/TopPanel";
import MiddlePanel from "../components/MiddlePanel";
import Waveform from "../components/Waveform";
import { Pause, PlayArrow } from "@mui/icons-material";
import SpeakingTest from "../components/SpeakingTest";
import { handleNext, handlePrevious } from "../utils/navigation";

interface Question {
  question?: string;
  question_id?: number;
  answer_type?: number;
  audio_url?: string;
  answer_audio_url?: string;
  topics: string[];
  options?: string[];
  image_url?: string | string[];
  paragraph?: string;
  questions?: {
    question: string;
    options: string[];
  }[];
}

interface TransformedListItem {
  section: string;
  question_id: number;
}

export type SpeakingQuestionResponse = {
  question_id: number;
  answer_type: number;
  question: string;
  hint: string;
  answer_audio_url: string;
};

const Assessment = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const heading = localStorage.getItem("assessmentData") || "";
  const assessmentId = searchParams.get("id");

  // State hooks
  const [question, setQuestion] = useState<Question>({ topics: [] });
  const [transformedList, setTransformedList] = useState<TransformedListItem[]>(
    []
  );
  const [totalAttemptedQuestionsMapping, setTotalAttemptedQuestionsMapping] =
    useState<Record<number, any>>({});
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [selectedMMcqOption, setSelectedMMcqOption] = useState<
    Record<number, number | null>
  >({});
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    const savedQuestion = localStorage.getItem("currentQuestion");
    return savedQuestion
      ? JSON.parse(savedQuestion)
      : { section: "", questionId: 0 };
  });
  const [writeupAnswer, setWriteupAnswer] = useState<string>("");

  const fetchQuestions = async () => {
    if (assessmentId && transformedList.length > 0) {
      try {
        const data = await EvalAPI.getQuestions(
          Number(assessmentId),
          currentQuestion.questionId
        );
        if (data) {
          setQuestion(data);
          const previouslyAttempted =
            totalAttemptedQuestionsMapping[currentQuestion.questionId];

          console.log("Previously attempted:", previouslyAttempted);

          if (data.answer_type === 0) {
            setSelectedOption(
              previouslyAttempted !== undefined ? previouslyAttempted : -1
            );
          }

          if (data.answer_type === 1) {
            setSelectedMMcqOption(
              previouslyAttempted !== undefined &&
                previouslyAttempted.length > 0
                ? previouslyAttempted.filter((option: number) => option !== -1)
                : {}
            );
          }

          if (data.answer_type === 2) {
            setWriteupAnswer(
              previouslyAttempted !== undefined
                ? previouslyAttempted.toString()
                : ""
            );
          }

          if (data.answer_type === 3) {
            setRecordedAudioURL(previouslyAttempted || null);
          }
        }
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    }
  };

  useEffect(() => {
    const transformedList = localStorage.getItem("transformedQuestions");
    if (transformedList) {
      const parsedTransformedList = JSON.parse(transformedList).questions;
      setTransformedList(parsedTransformedList);
      const firstQuestion = parsedTransformedList[0];
      const savedCurrentQuestion = localStorage.getItem("currentQuestion");
      if (!savedCurrentQuestion) {
        setCurrentQuestion({
          section: firstQuestion.section,
          questionId: firstQuestion.question_id,
        });
        localStorage.setItem(
          "currentQuestion",
          JSON.stringify({
            section: firstQuestion.section,
            questionId: firstQuestion.question_id,
          })
        );
      }
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [
    assessmentId,
    currentQuestion,
    transformedList,
    totalAttemptedQuestionsMapping,
  ]);

  const handleOptionChange = (option: number) => {
    setSelectedOption(option);
  };

  const handleMMcqOptionChange = (index: number, option: number) => {
    setSelectedMMcqOption((prev) => ({
      ...prev,
      [index]: option,
    }));
  };

  const handleSubmit = async (questionType: number) => {
    console.log("Submitting answer for question:",questionType);
    if (assessmentId && currentQuestion.questionId) {
      try {
        if (selectedOption >= 0 && questionType === 0)
          await EvalAPI.submitAnswer(
            Number(assessmentId),
            currentQuestion.questionId,
            selectedOption.toString(),
            1
          );
        if (writeupAnswer && questionType === 2)
          await EvalAPI.submitAnswerWriteUp(
            Number(assessmentId),
            currentQuestion.questionId,
            writeupAnswer,
            2
          );
        if (selectedMMcqOption && questionType === 1)
          await EvalAPI.submitAnswerMMCQ(
            currentQuestion.questionId,
            Number(assessmentId),
            Object.values(selectedMMcqOption)
              .map((option) => (option !== null ? option : -1))
              .filter((option) => option !== -1),
            3
          );
        if (questionType === 3) {
          submitAudioQuestion();
        }
        setTotalAttemptedQuestionsMapping((prev) => ({
          ...prev,
          [currentQuestion.questionId]: selectedOption,
        }));

        // if the question is last and submitted also then end the assessment
        if (
          transformedList.findIndex(
            (item) =>
              item.section === currentQuestion.section &&
              item.question_id === currentQuestion.questionId
          ) ===
          transformedList.length - 1
        ) {
          confirmationModal.open();
        }
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    }

    handleNext(transformedList, currentQuestion, setCurrentQuestion);
  };

  // fetch attempted questions and set the state for attempted questions mapping everytime assessmentId changes and question is fetched
  useEffect(() => {
    const fetchAttemptedQuestions = async () => {
      if (assessmentId) {
        const data = await EvalAPI.getState(Number(assessmentId));
        if (data) {
          console.log("Attempted questions:", data.attempted_questions);
          const attemptedQuestionsMap = data.attempted_questions.reduce(
            (acc: any, curr: any) => {
              if (curr.answer_text) {
                acc[curr.question_id] = curr.answer_text;
              } else if (
                curr.multiple_mcq_answer &&
                curr.multiple_mcq_answer.length > 0
              ) {
                acc[curr.question_id] = curr.multiple_mcq_answer;
              } else if (curr.answer_audio_url) {
                acc[curr.question_id] = curr.answer_audio_url;
              } else {
                acc[curr.question_id] = curr.mcq_answer;
              }
              return acc;
            },

            {}
          );

          console.log("Attempted questions map:", attemptedQuestionsMap);
          setTotalAttemptedQuestionsMapping(attemptedQuestionsMap);
        }
      }
    };
    fetchAttemptedQuestions();
  }, [assessmentId,currentQuestion]);

  // Modal configs
  const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    return { isOpen, open, close };
  };

  const confirmationModal = useModal();
  const questionModal = useModal();

  // End the assessment
  const handleEndAssessment = async () => {
    try {
      await EvalAPI.exitAssessment(Number(assessmentId));
      localStorage.removeItem("currentQuestion");
      localStorage.removeItem("assessmentData");
      localStorage.removeItem("transformedQuestions");

      // navigate react to home
      window.location.href = "/assessment-results";
    } catch (error) {
      console.error("Error ending assessment:", error);
    }
  };

  const [recordedAudioURL, setRecordedAudioURL] = useState<string | null>(null);

  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);

  const handleAudioPlayPauseClick = () => setAudioPlaying((prev) => !prev);

  const handleWaveFormFinish = () => setAudioPlaying(false);

  const submitAudioQuestion = async () => {
    if (recordedAudioURL === null) return;

    try {
      const speakingData = question;
      const audioFileUploaded = await EvalAPI.uploadAudioFile(
        recordedAudioURL,
        speakingData.answer_audio_url || ""
      );
      if (audioFileUploaded) {
        const resp = await EvalAPI.submitSpeakingAnswer(
          speakingData.question_id || -1,
          Number(assessmentId)
        );

        // if resp is success and if there are more questions in questionList, move to next question and change activeQuestionId
        if (resp) {
          handleNext(transformedList, currentQuestion, setCurrentQuestion);
        }
      } else throw new Error("Audio file not uploaded");
    } catch (error) {
      console.error("Error submitting speaking question", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        backgroundColor: "#EFF6FF",
        padding: "20px",
      }}
    >
      <TopPanel
        heading={heading}
        assessmentId={assessmentId || ""}
        TimeUpHandler={() => localStorage.clear()}
        questionModal={questionModal.open}
        confirmationModal={confirmationModal.open}
      />
      <MiddlePanel
        currentQuestion={currentQuestion}
        handlePrevious={() =>
          handlePrevious(transformedList, currentQuestion, setCurrentQuestion)
        }
        handleNext={() =>
          handleNext(transformedList, currentQuestion, setCurrentQuestion)
        }
        transformedList={transformedList}
      />
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
        <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          <Typography sx={{ color: "#000", fontSize: "1.5rem" }}>
            Question:{" "}
            {transformedList.findIndex(
              (item) =>
                item.section === currentQuestion.section &&
                item.question_id === currentQuestion.questionId
            ) + 1}
          </Typography>
          <TagChip title={currentQuestion.section} />
        </Box>

        {/*  question */}
        {question && (
          <Typography sx={{ color: "black", fontSize: "1.2rem" }}>
            {question.question}
          </Typography>
        )}

        {/* question paragraph */}
        {question.paragraph && (
          <Typography sx={{ color: "black", fontSize: "1.2rem" }}>
            {question.paragraph}
          </Typography>
        )}

        {/* show the waveform, if the question is of type listening */}
        {question.audio_url && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Waveform
              url={question.audio_url}
              playing={audioPlaying}
              onFinish={handleWaveFormFinish}
              width={700}
            />
            <Tooltip title={audioPlaying ? "Pause" : "Play"}>
              <IconButton onClick={handleAudioPlayPauseClick}>
                {audioPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {question.answer_type === 3 && (
          <SpeakingTest
            recordedAudioURL={recordedAudioURL}
            setRecordedAudioURL={setRecordedAudioURL}
          />
        )}

        {question.image_url && Array.isArray(question.image_url) && (
          <Box sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            {question.image_url.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="question"
                style={{ width: "80%", height: "auto" }}
              />
            ))}
          </Box>
        )}

        {question.options && (
          <ToggleButtonGroup
            orientation="vertical"
            exclusive
            sx={{ minWidth: "200px", maxWidth: "400px", gap: "10px" }}
            value={selectedOption}
            onChange={(_, newSelectedOption) =>
              handleOptionChange(newSelectedOption)
            }
          >
            {question.options.map((option, index) => (
              <ToggleButton
                key={index}
                value={index}
                color="primary"
                sx={{
                  padding: "10px",
                  backgroundColor: "#fff",
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

        {question.questions && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {question.questions.map((subQuestion, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  mb: "10px",
                }}
              >
                <Typography>
                  {index + 1}. {subQuestion.question}
                </Typography>
                <ToggleButtonGroup
                  value={selectedMMcqOption[index] ?? null}
                  onChange={(_, newSelectedOption) =>
                    handleMMcqOptionChange(index, newSelectedOption)
                  }
                  orientation="vertical"
                  exclusive
                  sx={{
                    minWidth: "200px",
                    maxWidth: "400px",
                    gap: "10px",
                  }}
                >
                  {subQuestion.options.map((option, optionIndex) => (
                    <ToggleButton
                      key={optionIndex}
                      value={optionIndex}
                      sx={{
                        padding: "10px",
                        backgroundColor: "#fff",
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
              </Box>
            ))}
          </Box>
        )}

        {/* text area for anwer_type = 2 */}
        {question.question && question.answer_type === 2 && (
          <TextField
            sx={{ marginBottom: "20px" }}
            id="anwer-writeup"
            label="Answer"
            multiline
            rows={10}
            defaultValue=""
            value={writeupAnswer}
            onChange={(e) => setWriteupAnswer(e.target.value)}
            variant="outlined"
          />
        )}

        {/* Submit button */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit(question.answer_type || -1)}
          >
            Submit 
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
        open={questionModal.isOpen}
        close={questionModal.close}
        transformedQuestionsList={transformedList}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={confirmationModal.isOpen}
        close={confirmationModal.close}
        submit={handleEndAssessment}
      />
    </Box>
  );
};

export default Assessment;
