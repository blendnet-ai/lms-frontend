import {
  Box,
  Button,
  CardMedia,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { icons, images } from "../../../assets";
import { useContext, useEffect, useRef, useState } from "react";
import { Pause, PlayArrow } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Waveform from "./Waveform";
import { CalculationsUtil } from "../../../utils/calculations";
import MockInterviewModal from "../modals/MockInterviewModal";
import { useLocation } from "react-router-dom";
import MockInterviewAPI from "../apis/MockInterviewApi";
import { MockInterviewContext } from "../Context/MockInterviewContext";
import MicPulsate from "../helpers/PulseWave/PulsatingMic";

export type SpeakingQuestionResponse = {
  question_id: number;
  answer_type: number;
  question: string;
  hint: string;
  answer_audio_url: string;
};

const InterviewMode = () => {
  const { mode } = useParams();
  const navigate = useNavigate();
  const { activeQuestionId, setActiveQuestionId } =
    useContext(MockInterviewContext);
  const location = useLocation();
  const response = location.state?.data;

  const [questionList, setQuestionList] = useState<number[]>([]);
  const [activeQuestion, setActiveQuestion] = useState<any>({});

  // retrieve response from previous page via location state
  useEffect(() => {
    if (response) {
      setQuestionList(response.questions[0]?.questions);
    }
  }, [response]);

  // fetch active question
  useEffect(() => {
    const fetchActiveQuestion = async (questionId: number) => {
      try {
        const response = await MockInterviewAPI.getQuestion(
          questionId,
          Number(mode)
        );
        setActiveQuestion(response);
      } catch (error) {
        console.error("Error fetching active question", error);
      }
    };

    if (activeQuestionId) fetchActiveQuestion(activeQuestionId);
  }, [activeQuestionId]);

  // states
  const [recordedAudioURL, setRecordedAudioURL] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [remainingRecordTime, setRemainingRecordTime] = useState<number>(120);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const startTimeRef = useRef<number | null>(null);
  const [recordingDuration, setRecordingDuration] = useState<number | null>(
    null
  );

  // modal configs
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const handleConfirmationModalOpen = () => setOpenConfirmationModal(true);
  const handleConfirmationModalClose = () => setOpenConfirmationModal(false);

  const [endInterviewModal, setEndInterviewModal] = useState(false);
  const handleEndInterviewModalOpen = () => setEndInterviewModal(true);
  const handleEndInterviewModalClose = () => setEndInterviewModal(false);

  // Reset recording when active question changes
  useEffect(() => {
    resetRecording();
  }, [activeQuestion.answer_audio_url]);

  // cleanup
  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        stopRecording();
      }
    };
  }, []);

  // disable submit button if recording is less than 5 seconds or if the recorded audio is same as the answer
  useEffect(() => {
    const shouldSubmitBeDisabled = () => {
      const speakingData = activeQuestion;
      if (
        recordedAudioURL === speakingData.answer_audio_url ||
        recordedAudioURL == null
      ) {
        return true;
      }

      if (recordingDuration && recordingDuration < 30) return true;
      return false;
    };

    setSubmitDisabled(shouldSubmitBeDisabled());
  }, [recordedAudioURL, recordingDuration]);

  // start recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream, {
        audioBitsPerSecond: 128000,
      });
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: "audio/wav" });
        const url = URL.createObjectURL(recordedBlob);
        console.log(url);
        setRecordedAudioURL(url);
        chunks.current = [];
      };
      mediaRecorderRef.current.start();
      startTimer();
      setIsRecording(true);
      startTimeRef.current = Date.now();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  // stop recording
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
    }
    stopTimer();
    setIsRecording(false);
    if (startTimeRef.current) {
      const endTime = Date.now();
      const duration = (endTime - startTimeRef.current) / 1000; // in seconds
      setRecordingDuration(duration);
    }
    startTimeRef.current = null;
  };

  // handle mic click
  const handleMicClick = () => {
    console.log("handling");
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // start timer
  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setRemainingRecordTime((prevRemainingTime) => {
          if (prevRemainingTime > 0) {
            return prevRemainingTime - 1;
          } else {
            stopRecording();
            return prevRemainingTime;
          }
        });
      }, 1000);
    }
  };

  // stop timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // reset recording
  const resetRecording = () => {
    setRemainingRecordTime(120);
    setRecordedAudioURL(null);
    setRecordingDuration(null);
    setSubmitDisabled(true);
  };

  // handle play/pause audio
  const handleAudioPlayPauseClick = () => setAudioPlaying((prev) => !prev);
  const handleWaveFormFinish = () => setAudioPlaying(false);

  // submit and next question
  const submitAndNext = async () => {
    if (recordedAudioURL === null) return;

    handleConfirmationModalClose();
    setIsUploading(true);
    try {
      const speakingData = activeQuestion as SpeakingQuestionResponse;
      const audioFileUploaded = await uploadAudioFile(
        recordedAudioURL,
        speakingData.answer_audio_url
      );
      if (audioFileUploaded) {
        const resp = await MockInterviewAPI.submitSpeaking(
          speakingData.question_id,
          Number(mode)
        );

        setIsUploading(false);

        // if resp is success and if there are more questions in questionList, move to next question and change activeQuestionId
        if (resp && questionList.length > 0) {
          const nextQuestionIndex = questionList.indexOf(activeQuestionId) + 1;
          if (nextQuestionIndex < questionList.length) {
            setActiveQuestionId(questionList[nextQuestionIndex]);
            localStorage.setItem(
              "activeQuestionId",
              questionList[nextQuestionIndex].toString()
            );
          } else {
            // if no more questions, close the assessment
            await MockInterviewAPI.closeAssessment(Number(mode));

            //  navigate to report page
            navigate(`/mock-interview/report/${mode}`);
          }
        }
      } else throw new Error("Audio file not uploaded");
    } catch (error) {
      console.error("Error submitting speaking question", error);
    }
  };

  // end interview
  const endInterview = async () => {
    handleEndInterviewModalClose();
    try {
      await MockInterviewAPI.abandonAssessment(Number(mode));
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("Error ending interview", error);
    }
  };

  // upload audio file to azure blob storage
  async function uploadAudioFile(
    recordedUrl: string,
    uploadUrl: string
  ): Promise<boolean> {
    if (!recordedUrl) return false;
    console.log(recordedUrl);
    console.log(uploadUrl);

    const resp = await fetch(recordedUrl);
    console.log("resp", resp);
    const file = await resp.blob();
    console.log("file", file);

    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": "audio/wav",
      },
      body: file,
    });

    if (response && response !== undefined && response.ok) {
      console.log(response);
      console.log("Audio file uploaded successfully!");
      return true;
    } else {
      console.error(
        "Failed to upload audio file:",
        response.status,
        response.statusText
      );
      return false;
    }
  }

  // log states
  useEffect(() => {
    console.log("Question List", questionList);
    console.log("Active Question Id", activeQuestionId);
    console.log("Active Question", activeQuestion);
    console.log(
      "Active Question Index",
      questionList.indexOf(activeQuestionId)
    );
    console.log("Length", questionList.length);
  }, [questionList, activeQuestionId, activeQuestion]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        backgroundColor: "#EFF6FF",
        width: "100%",
        height: "100vh",
        position: "relative",
      }}
    >
      {/* loading state  */}
      {isUploading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {/* Header Bar*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
          mx: "2rem",
        }}
      >
        {/* Heading  */}
        <Typography
          sx={{
            fontSize: 24,
            color: "#225BEF",
            fontWeight: 600,
          }}
        >
          Mock Interview : {mode}
        </Typography>

        {/* Options */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "0.5rem 1rem 0.5rem 0.5rem",
              borderRadius: "50px",
              backgroundColor: "#2059EE",
              gap: "0.5rem",
              width: "fit-content",
            }}
          >
            <CardMedia
              component="img"
              image={icons.timeStart}
              sx={{
                backgroundColor: "white",
                borderRadius: "50%",
                color: "#2059EE",
                padding: "2px",
                width: "25px",
                height: "25px",
              }}
            />

            <Typography
              sx={{
                fontSize: 16,
                color: "white",
                fontWeight: 600,
              }}
            >
              {CalculationsUtil.formatTime(remainingRecordTime)}
            </Typography>
          </Box>

          <Button
            sx={{
              backgroundColor: submitDisabled ? "#B0B0B0" : "#2059EE",
              color: "white",
              borderRadius: "10px",
              padding: "0rem 1rem",
              "&:hover": { backgroundColor: "#2059EE" },
            }}
            disabled={submitDisabled}
            onClick={handleConfirmationModalOpen}
          >
            <Typography
              sx={{
                fontSize: 16,
                textTransform: "none",
              }}
            >
              Next
            </Typography>
          </Button>
          <Button
            sx={{
              backgroundColor: "#ED5050",
              color: "white",
              borderRadius: "10px",
              padding: "0rem 1rem",
              "&:hover": { backgroundColor: "#ED5050" },
            }}
            onClick={handleEndInterviewModalOpen}
          >
            <Typography
              sx={{
                fontSize: 16,
                textTransform: "none",
              }}
            >
              End Interview
            </Typography>
          </Button>
        </Box>
      </Box>

      {/* Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          mx: "2rem",
          backgroundColor: "white",
          height: "100%",
          padding: "1rem",
          borderRadius: "10px",
        }}
      >
        {/* welcome  */}
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: "20px",
            padding: "20px",
            width: "min-content",
            minWidth: "750px",
            mx: "auto",
          }}
        >
          <CardMedia
            component="img"
            image={images.interviewDisha}
            alt="avatar"
            sx={{ width: 150, height: 150, borderRadius: "15px" }}
          />
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              border: "2px solid #CFE4FF",
              borderRadius: "0px 10px 10px 10px",
              padding: "10px",
              width: "100%",
              mb: "20px",
              backgroundColor: "#EFF6FF",
            }}
          >
            {activeQuestion.question}
          </Typography>
        </Box>

        {/* show the waveform */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
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
              url={recordedAudioURL || ""}
              playing={audioPlaying}
              onFinish={handleWaveFormFinish}
              width={700}
            />
            <Tooltip title={audioPlaying ? "Pause" : "Play"}>
              <IconButton
                onClick={handleAudioPlayPauseClick}
                disabled={!recordedAudioURL}
              >
                {audioPlaying ? <Pause /> : <PlayArrow />}
              </IconButton>
            </Tooltip>
            <Tooltip title="Restart">
              <IconButton
                onClick={resetRecording}
                disabled={recordedAudioURL === null}
              >
                <RestartAltIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <MicPulsate
            animate={isRecording}
            clickHandler={recordedAudioURL ? () => {} : handleMicClick}
          />

          <Typography
            sx={{
              fontSize: 16,
              color: "#000",
              fontWeight: 600,
            }}
          >
            {recordedAudioURL
              ? "Recording Complete"
              : isRecording
              ? "Tap to stop recording"
              : "Tap to start recording"}
          </Typography>
        </Box>

        {/* When the recorded audio is less than 30 seconds, the following message is displayed: */}
        {recordedAudioURL && recordingDuration !== null && (
          <Box
            sx={{
              color: "red",
              fontSize: 14,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              width: "100%",
            }}
          >
            {(() => {
              if (recordingDuration < 30) {
                return `Please record for atleat ${30} seconds to submit.`;
              }
              return "";
            })()}
          </Box>
        )}
      </Box>

      <MockInterviewModal
        open={openConfirmationModal}
        close={handleConfirmationModalClose}
        submit={submitAndNext}
        title="Are you sure you want to move to next question?"
        description="Once you proceed to the next question, your response will be submitted, and you won’t be able to make any changes."
      />

      <MockInterviewModal
        open={endInterviewModal}
        close={handleEndInterviewModalClose}
        submit={endInterview}
        title="Are you sure you want to end interview?"
        description="Once you end the interview, your response will not be submitted, and it will not show in report."
      />
    </Box>
  );
};

export default InterviewMode;
