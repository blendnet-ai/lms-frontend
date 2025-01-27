import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import { Pause, Play } from "lucide-react";
import EvalAPI from "../../apis/EvalAPI";
import { handleNext, handlePrevious } from "../../utils/navigation";
import TopPanel from "./components/TopPanel";
import MiddlePanel from "./components/MiddlePanel";
import TagChip from "../../helpers/TagChip";
import Waveform from "./components/Waveform";
import SpeakingTest from "./components/SpeakingTest";
import QuestionNavigatorModal from "../../modals/QuestionsNavigator";
import ConfirmationModal from "../../modals/ConfirmationModal";
import { useFetchQuestions } from "../../hooks/useFetchQuestions";
import { useFetchAttemptedQuestions } from "../../hooks/useFetchAttemptedQuestions";
import { useModal } from "../../hooks/useModal";
import { splitIntoParagraphs } from "../../utils/splitIntoParagraphs";

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

export enum ANSWER_TYPE {
  MCQ = 0,
  MMCQ = 1,
  SUBJECTIVE = 2,
  VOICE = 3,
}
const Assessment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const assessmentId = searchParams.get("id");
  const currentQuestionId = searchParams.get("questionId");

  // State hooks
  const [question, setQuestion] = useState<Question>({ topics: [] });
  const [questions, setQuestions] = useState<TransformedListItem[]>([]);
  const [totalAttemptedQuestionsMapping, setTotalAttemptedQuestionsMapping] =
    useState<Record<number, any>>({});
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [selectedMMcqOption, setSelectedMMcqOption] = useState<
    Record<number, number | null>
  >({});
  const [currentQuestion, setCurrentQuestion] = useState<{
    section: string;
    questionId: number;
  }>({
    section: "",
    questionId: currentQuestionId ? Number(currentQuestionId) : 0,
  });
  const [writeupAnswer, setWriteupAnswer] = useState<string>("");
  const [recordedAudioURL, setRecordedAudioURL] = useState<string | null>(null);

  const { fetchQuestions } = useFetchQuestions(
    assessmentId,
    currentQuestion,
    questions,
    setQuestion,
    setSelectedOption,
    setSelectedMMcqOption,
    setWriteupAnswer,
    setRecordedAudioURL,
    totalAttemptedQuestionsMapping
  );

  const { fetchAttemptedQuestions } = useFetchAttemptedQuestions(
    assessmentId,
    currentQuestionId,
    setTotalAttemptedQuestionsMapping,
    setQuestions,
    setCurrentQuestion
  );

  useEffect(() => {
    fetchQuestions();
  }, [
    assessmentId,
    currentQuestion,
    questions,
    totalAttemptedQuestionsMapping,
  ]);

  useEffect(() => {
    fetchAttemptedQuestions();
  }, [assessmentId, currentQuestionId]);

  useEffect(() => {
    if (question.audio_url) {
      setAudioPlaying(false);
    }
  }, [question.audio_url]);

  const handleOptionChange = (option: number) => {
    setSelectedOption(option);
  };

  const handleMMcqOptionChange = (index: number, option: number) => {
    setSelectedMMcqOption((prev) => ({
      ...prev,
      [index]: option,
    }));
  };

  const handleSubmit = async (answerType: number) => {
    if (assessmentId && currentQuestion.questionId) {
      try {
        if (selectedOption >= 0 && answerType === ANSWER_TYPE.MCQ)
          await EvalAPI.submitAnswer(
            Number(assessmentId),
            currentQuestion.questionId,
            selectedOption.toString(),
            1
          );
        if (writeupAnswer && answerType === ANSWER_TYPE.SUBJECTIVE)
          await EvalAPI.submitAnswerWriteUp(
            Number(assessmentId),
            currentQuestion.questionId,
            writeupAnswer,
            2
          );
        if (selectedMMcqOption && answerType === ANSWER_TYPE.MMCQ)
          await EvalAPI.submitAnswerMMCQ(
            currentQuestion.questionId,
            Number(assessmentId),
            Object.values(selectedMMcqOption)
              .map((option) => (option !== null ? option : -1))
              .filter((option) => option !== -1),
            3
          );
        if (answerType === ANSWER_TYPE.VOICE) {
          submitAudioQuestion();
        }

        setTotalAttemptedQuestionsMapping((prev) => ({
          ...prev,
          [currentQuestion.questionId]: selectedOption,
        }));

        // if the question is last and submitted also then end the assessment
        if (
          questions.findIndex(
            (item) =>
              item.section === currentQuestion.section &&
              item.question_id === currentQuestion.questionId
          ) ===
          questions.length - 1
        ) {
          confirmationModal.open();
        }
      } catch (error) {
        console.error("Error submitting answer:", error);
      }
    }

    handleNext(questions, currentQuestion, (newQuestion) => {
      setCurrentQuestion(newQuestion);
      navigate(
        `${location.pathname}?id=${assessmentId}&questionId=${newQuestion.questionId}`
      );
    });
  };

  const handleNextQuestion = (
    questions: TransformedListItem[],
    currentQuestion: { section: string; questionId: number },
    setCurrentQuestion: React.Dispatch<
      React.SetStateAction<{ section: string; questionId: number }>
    >
  ) => {
    handleNext(questions, currentQuestion, (newQuestion) => {
      setCurrentQuestion(newQuestion);
      navigate(
        `${location.pathname}?id=${assessmentId}&questionId=${newQuestion.questionId}`
      );
    });
  };

  const handlePreviousQuestion = (
    questions: TransformedListItem[],
    currentQuestion: { section: string; questionId: number },
    setCurrentQuestion: React.Dispatch<
      React.SetStateAction<{ section: string; questionId: number }>
    >
  ) => {
    handlePrevious(questions, currentQuestion, (newQuestion) => {
      setCurrentQuestion(newQuestion);
      navigate(
        `${location.pathname}?id=${assessmentId}&questionId=${newQuestion.questionId}`
      );
    });
  };

  const confirmationModal = useModal();
  const questionModal = useModal();

  const handleEndAssessment = async () => {
    try {
      await EvalAPI.exitAssessment(Number(assessmentId));
      localStorage.removeItem("transformedQuestions");

      // navigate react to home
      navigate("/assessment-results", {
        state: {
          isTestEnded: true,
        },
        replace: true,
      });
    } catch (error) {
      console.error("Error ending assessment:", error);
    }
  };

  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);

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
          handleNext(questions, currentQuestion, setCurrentQuestion);
        }
      } else throw new Error("Audio file not uploaded");
    } catch (error) {
      console.error("Error submitting speaking question", error);
    }
  };

  const [playbackSpeed, setPlaybackSpeed] = useState<string>("1");

  const handleChange = (event: SelectChangeEvent) => {
    setPlaybackSpeed(event.target.value);
  };

  const handleAudioPlayPauseClick = useCallback(() => {
    setAudioPlaying((prev) => !prev);
  }, []);

  const handleWaveFormFinish = useCallback(() => {
    setAudioPlaying(false);
  }, []);

  const handleQuestionChange = (newQuestion: {
    section: string;
    questionId: number;
  }) => {
    setCurrentQuestion(newQuestion);
    navigate(
      `${location.pathname}?id=${assessmentId}&questionId=${newQuestion.questionId}`
    );
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
        assessmentId={assessmentId || ""}
        TimeUpHandler={() => localStorage.clear()}
        questionModal={questionModal.open}
        confirmationModal={confirmationModal.open}
      />
      <MiddlePanel
        currentQuestion={currentQuestion}
        handlePrevious={() =>
          handlePreviousQuestion(questions, currentQuestion, setCurrentQuestion)
        }
        handleNext={() =>
          handleNextQuestion(questions, currentQuestion, setCurrentQuestion)
        }
        transformedList={questions}
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
            {questions.findIndex(
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
            {question.question &&
              splitIntoParagraphs(question.question).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </Typography>
        )}

        {/* question paragraph */}
        {question.paragraph && (
          <Typography sx={{ color: "black", fontSize: "1.2rem" }}>
            {question.paragraph &&
              splitIntoParagraphs(question.paragraph).map(
                (paragraph, index) => <p key={index}>{paragraph}</p>
              )}
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
              playbackSpeed={Number(playbackSpeed)}
            />
            <Tooltip title={audioPlaying ? "Pause" : "Play"}>
              <IconButton onClick={handleAudioPlayPauseClick}>
                {audioPlaying ? <Pause /> : <Play />}
              </IconButton>
            </Tooltip>

            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <InputLabel id="demo-select-small-label">
                Playback Speed
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={playbackSpeed}
                label="Playback Speed"
                onChange={handleChange}
              >
                <MenuItem value={"1"}>1x</MenuItem>
                <MenuItem value={"1.5"}>1.5x</MenuItem>
                <MenuItem value={"2"}>2x</MenuItem>
              </Select>
            </FormControl>
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
            onClick={() =>
              question.answer_type !== undefined &&
              handleSubmit(question.answer_type)
            }
          >
            Submit
          </Button>
        </Box>
      </Box>

      {/* Question Navigator Modal */}
      <QuestionNavigatorModal
        currentQuestion={currentQuestion}
        setCurrentQuestion={handleQuestionChange}
        open={questionModal.isOpen}
        close={questionModal.close}
        transformedQuestionsList={questions}
        attemptedQuestionsMapping={totalAttemptedQuestionsMapping}
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
