import { Box, CardMedia, IconButton, Tooltip, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { Pause, PlayArrow } from "@mui/icons-material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import MicPulsate from "../../../helpers/PulsatinMic";
import Waveform from "./Waveform";
import { icons } from "../../../assets";
import { CalculationsUtil } from "../../../utils/calculations";

const SpeakingTest = ({
  recordedAudioURL,
  setRecordedAudioURL,
}: {
  recordedAudioURL: string | null;
  setRecordedAudioURL: (url: string | null) => void;
}) => {
  const [recordingDuration, setRecordingDuration] = useState<number | null>(
    null
  );
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [remainingRecordTime, setRemainingRecordTime] = useState<number>(120);
  const startTimeRef = useRef<number | null>(null);

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

  const handleMicClick = () => {
    console.log("handling");
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };
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
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const handleWaveFormFinish = () => setAudioPlaying(false);
  const handleAudioPlayPauseClick = () => setAudioPlaying((prev) => !prev);
  const resetRecording = () => {
    setRemainingRecordTime(120);
    setRecordedAudioURL(null);
    setRecordingDuration(null);
  };

  return (
    <Box>
      {/* show the waveform, and recording button, if the question is of type speaking */}
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MicPulsate animate={isRecording} clickHandler={handleMicClick} />
          <Typography
            sx={{
              fontSize: 16,
              color: "#000",
              fontWeight: 600,
            }}
          >
            {recordedAudioURL ? "Recording Complete" : "Tap to start recording"}
          </Typography>
        </Box>
        <Waveform
          url={recordedAudioURL || ""}
          playing={audioPlaying}
          onFinish={handleWaveFormFinish}
          width={700}
        />

        {/* timer  */}
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

        {/*  play/pause button */}
        <Tooltip title={audioPlaying ? "Pause" : "Play"}>
          <IconButton
            onClick={handleAudioPlayPauseClick}
            disabled={!recordedAudioURL}
          >
            {audioPlaying ? <Pause /> : <PlayArrow />}
          </IconButton>
        </Tooltip>

        {/* reset button */}
        <Tooltip title="Reset">
          <IconButton onClick={resetRecording} disabled={!recordedAudioURL}>
            <RestartAltIcon />
          </IconButton>
        </Tooltip>
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
  );
};

export default SpeakingTest;
