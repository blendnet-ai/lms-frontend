import { useEffect, useRef, useState } from "react";
import { SpeakingQuestionResponse } from "../../apis/EvalAPI";
import "./../../styles/eval/SpeakingTest.css";
import { CalculationsUtil } from "./../../utils/calculations";
import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import Waveform from "./Waveform";
import { Pause, PlayArrow } from "@mui/icons-material";
import { icons } from "../../assets";
import appConfig from "../../configs/app";

type SpeakingTestProps = {
  data: SpeakingQuestionResponse;
  audioURL: string | null;
  setAudioURL: (arg1: string | null) => void;
  maxWords: number;
  setSubmitDisabled: (disabled: boolean) => void;
};

type PulsatingAnimationContainerProps = {
  animating: boolean;
  onClick?: () => void;
  children: JSX.Element;
};

function PulsatingAnimationContainer(props: PulsatingAnimationContainerProps) {
  return (
    <div className="SpeakingTest-micContainer-0" onClick={props.onClick}>
      <div
        className={`SpeakingTest-micContainer-1 ${
          props.animating ? "animate" : ""
        }`}
      >
        <div
          className={`SpeakingTest-micContainer-2 ${
            props.animating ? "animate" : ""
          }`}
        >
          <div className="SpeakingTest-micContainer-3">{props.children}</div>
        </div>
      </div>
    </div>
  );
}

function SpeakingTest(props: SpeakingTestProps) {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [remainingRecordTime, setRemainingRecordTime] = useState<number>(
    appConfig.MAX_SPEAKING_SECONDS
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);

  const startTimeRef = useRef<number | null>(null);
  const [recordingDuration, setRecordingDuration] = useState<number | null>(
    null
  );

  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);

  useEffect(() => {
    resetRecording();
  }, [props.audioURL]);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        stopRecording();
      }
    };
  }, []);

  useEffect(() => {
    const shouldSubmitBeDisabled = () => {
      const speakingData = props.data;
      if (
        props.audioURL === speakingData.answer_audio_url ||
        props.audioURL == null
      ) {
        return true;
      }
      if (
        recordingDuration &&
        recordingDuration < appConfig.MIN_SPEAKING_SECONDS
      )
        return true;
      return false;
    };
    props.setSubmitDisabled(shouldSubmitBeDisabled());
  }, [props.audioURL]);

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
        props.setAudioURL(url);
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

  const handleMicClick = () => {
    console.log("handling");
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

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

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const resetRecording = () => {
    setRemainingRecordTime(appConfig.MAX_SPEAKING_SECONDS);
  };

  const handleAudioPlayPauseClick = () => setAudioPlaying((prev) => !prev);

  const handleWaveFormFinish = () => setAudioPlaying(false);

  return (
    <div className="SpeakingTest">
      <div className="SpeakingTest-question-text">{props.data.question}</div>

      {props.audioURL && (
        <div className="SpeakingTest-audioplayer-container">
          <Waveform
            url={props.audioURL}
            playing={audioPlaying}
            onFinish={handleWaveFormFinish}
          />
          <IconButton onClick={handleAudioPlayPauseClick} aria-label="delete">
            {audioPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
        </div>
      )}
      {props.audioURL && recordingDuration !== null && (
        <div className="SpeakingTest-warning">
          {(() => {
            if (recordingDuration < appConfig.MIN_SPEAKING_SECONDS) {
              return `Please record for atleat ${appConfig.MIN_SPEAKING_SECONDS} seconds to submit.`;
            }
            return "";
          })()}
        </div>
      )}

      <div className="SpeakingTest-mic-and-timer-container">
        <PulsatingAnimationContainer
          onClick={props.audioURL ? () => {} : handleMicClick}
          animating={isRecording}
          children={<img src={icons.mic} alt="" />}
        />

        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            style={{ color: "#8c54f6" }}
            thickness={8}
            size={100}
            value={remainingRecordTime / (appConfig.MAX_SPEAKING_SECONDS / 100)}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >
              {CalculationsUtil.formatTime(remainingRecordTime)}
            </Typography>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default SpeakingTest;
