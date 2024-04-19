import { Box, Button, CircularProgress, Typography } from "@mui/material";
import "./../styles/Practice.css";
import { useEffect, useRef, useState } from "react";
import { Height, Mic } from "@mui/icons-material";
import { GetQuestionResponse, PracticeAPI } from "../apis/PracticeAPI";
import { useNavigate } from "react-router-dom";

const MAX_RECORD_TIME = 120;

function formatSecondsToMinutesAndSeconds(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedTime = `${minutes
    .toString()
    .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;

  return formattedTime;
}

function Practice() {
  const [data, setData] = useState<GetQuestionResponse | null>(null);

  const [remainingRecordTime, setRemainingRecordTime] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    const data = await PracticeAPI.getQuestion();
    setData(data);
    setRemainingRecordTime(data.time_limit);
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
        setRecordedUrl(url);
        chunks.current = [];
      };
      mediaRecorderRef.current.start();
      startTimer();
      setIsRecording(true);
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
  };

  const handleMicClick = () => {
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
    setRemainingRecordTime(MAX_RECORD_TIME);
    stopRecording();
    setRecordedUrl(null);
  };

  async function uploadAudioFile(): Promise<boolean> {
    if (!data || !recordedUrl) return false;
    console.log(data.audio_url);

    const resp = await fetch(recordedUrl);
    const file = await resp.blob();

    console.log("url");
    console.log(data.audio_url);

    const response = await fetch(data.audio_url, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": "audio/mp4",
      },
      body: file,
    });

    if (response && response != undefined && response.ok) {
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

  const submitQues = async () => {
    if (data) PracticeAPI.submitQuestionResponse(data.id);
  };

  const submitResponse = async () => {
    if (data) {
      const audioFileUploaded = await uploadAudioFile();
      if (audioFileUploaded) submitQues();
      navigate(`/report?questionId=${data.id}`);
    }
  };

  if (!data) {
    return <CircularProgress />;
  }

  return (
    <div className="Practice">
      {/* <h3>Practice</h3> */}
      <div className="question-container">{data?.question}</div>
      <Box sx={{ position: "relative", display: "inline-flex" }}>
        <CircularProgress
          variant="determinate"
          thickness={8}
          size={100}
          value={remainingRecordTime / (MAX_RECORD_TIME / 100)}
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
          <Typography variant="caption" component="div" color="text.secondary">
            {formatSecondsToMinutesAndSeconds(remainingRecordTime)}
          </Typography>
        </Box>
      </Box>
      <div className="mic-delete-container">
        <img src="/icons/delete.png" style={{ visibility: "hidden" }} />
        <div
          style={recordedUrl ? { backgroundColor: "#c1c2c3" } : {}}
          className={`mic-container ${isRecording ? "recording" : ""}`}
          onClick={recordedUrl ? () => {} : handleMicClick}
        >
          <img src="/icons/mic.png" />
        </div>
        <img
          src="/icons/delete.png"
          onClick={resetRecording}
          style={{ visibility: recordedUrl ? "visible" : "hidden" }}
        />
      </div>
      {recordedUrl && <audio controls src={recordedUrl} />}

      {recordedUrl ? (
        <Button
          sx={{ borderRadius: 10, textTransform: "none" }}
          variant="contained"
          onClick={submitResponse}
        >
          Submit
        </Button>
      ) : (
        <Button
          sx={{ borderRadius: 10, textTransform: "none" }}
          variant="contained"
          onClick={fetchQuestion}
          disabled={isRecording}
        >
          Change question
        </Button>
      )}
    </div>
  );
}

export default Practice;
