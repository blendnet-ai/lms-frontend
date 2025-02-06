import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Pause, Play } from "lucide-react";
import { ROUTES } from "../../configs/routes";

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
      navigate(ROUTES.ASSESSMENT.RESULTS, {
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
    <main className="flex flex-col w-full h-full min-h-screen bg-blue-50 p-8 pt-4">
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
      <section className="flex flex-col gap-3 p-4 bg-white">
        <div className="flex flex-row gap-4">
          <h1 className="text-2xl font-normal text-black">
            Question:{" "}
            {questions.findIndex(
              (item) =>
                item.section === currentQuestion.section &&
                item.question_id === currentQuestion.questionId
            ) + 1}
          </h1>
          <TagChip title={currentQuestion.section} />
        </div>

        {/*  question */}
        {question && (
          <p className="text-black text-lg">
            {question.question &&
              splitIntoParagraphs(question.question).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
          </p>
        )}

        {/* question paragraph */}
        {question.paragraph && (
          <p className="text-black text-lg">
            {question.paragraph &&
              splitIntoParagraphs(question.paragraph).map(
                (paragraph, index) => <p key={index}>{paragraph}</p>
              )}
          </p>
        )}

        {/* show the waveform, if the question is of type listening */}
        {question.audio_url && (
          <div className="flex flex-row gap-4 items-center justify-center w-full">
            <Waveform
              url={question.audio_url}
              playing={audioPlaying}
              onFinish={handleWaveFormFinish}
              width={700}
              playbackSpeed={Number(playbackSpeed)}
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button variant="light" onClick={handleAudioPlayPauseClick}>
                    {audioPlaying ? <Pause /> : <Play />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {audioPlaying ? "Pause" : "Play"}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Select
              value={playbackSpeed}
              onValueChange={setPlaybackSpeed}
              required
            >
              <SelectTrigger className="w-max">
                <SelectValue placeholder="Playback Speed">
                  {playbackSpeed}x
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={"1"}>1x</SelectItem>
                  <SelectItem value={"1.5"}>1.5x</SelectItem>
                  <SelectItem value={"2"}>2x</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        {question.answer_type === 3 && (
          <SpeakingTest
            recordedAudioURL={recordedAudioURL}
            setRecordedAudioURL={setRecordedAudioURL}
          />
        )}

        {question.image_url && Array.isArray(question.image_url) && (
          <div className="flex flex-row gap-3">
            {question.image_url.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="question"
                style={{ width: "80%", height: "auto" }}
              />
            ))}
          </div>
        )}

        {question.options && (
          <div className="flex flex-col gap-4 w-64 max-w-xs">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedOption === index ? "default" : "light"}
                onClick={() => handleOptionChange(index)}
              >
                {option}
              </Button>
            ))}
          </div>
        )}

        {question.questions && (
          <div className="flex flex-col gap-2">
            {question.questions.map((subQuestion, index) => (
              <div key={index} className="flex flex-col gap-2 mb-2">
                <p className="text-lg">
                  {index + 1}. {subQuestion.question}
                </p>
                <div className="flex flex-col gap-2 w-max min-w-64">
                  {subQuestion.options.map((option, optionIndex) => (
                    <Button
                      key={optionIndex}
                      variant={
                        selectedMMcqOption[index] === optionIndex
                          ? "default"
                          : "light"
                      }
                      onClick={() => handleMMcqOptionChange(index, optionIndex)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* text area for anwer_type = 2 */}
        {question.question && question.answer_type === 2 && (
          <Textarea
            id="anwer-writeup"
            value={writeupAnswer}
            onChange={(e) => setWriteupAnswer(e.target.value)}
            placeholder="Write your answer here"
            required
          />
        )}

        {/* Submit button */}
        <div className="flex flex-row gap-4 items-center w-full">
          <Button
            variant="primary"
            onClick={() =>
              question.answer_type !== undefined &&
              handleSubmit(question.answer_type)
            }
          >
            Submit
          </Button>
        </div>
      </section>

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
    </main>
  );
};

export default Assessment;
