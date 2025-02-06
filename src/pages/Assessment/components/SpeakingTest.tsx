import { useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  const [openResetDialog, setOpenResetDialog] = useState<boolean>(false);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setRemainingRecordTime((prevRemainingTime) => {
          if (prevRemainingTime > 0) {
            return prevRemainingTime - 1;
          } else {
            stopRecording();
            return 0;
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
    if (isRecording && remainingRecordTime && remainingRecordTime < 90) {
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

  const handleResetClick = () => {
    setOpenResetDialog(true);
  };

  const handleResetConfirm = () => {
    resetRecording();
    setOpenResetDialog(false);
  };

  const handleResetCancel = () => {
    setOpenResetDialog(false);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-center w-full gap-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <MicPulsate animate={isRecording} clickHandler={handleMicClick} />
          <p className="text-base text-black font-semibold">
            {isRecording
              ? "Recording..."
              : recordedAudioURL
              ? "Recording Complete"
              : "Tap to start recording"}
          </p>
        </div>

        <Waveform
          url={recordedAudioURL || ""}
          playing={audioPlaying}
          onFinish={handleWaveFormFinish}
          width={700}
        />

        {/* Timer */}
        <div className="flex flex-row items-center px-4 py-2 rounded-full bg-[#2059EE] gap-2">
          <img
            src={icons.timeStart}
            className="w-6 h-6 p-0.5 bg-white rounded-full"
            alt="timer"
          />
          <span className="text-base text-white font-semibold">
            {CalculationsUtil.formatTime(120 - remainingRecordTime)} /
          </span>
          <span className="text-base text-white font-semibold">02:00</span>
        </div>

        {/* Play/Pause button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleAudioPlayPauseClick}
                disabled={!recordedAudioURL}
              >
                {audioPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{audioPlaying ? "Pause" : "Play"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Reset button */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleResetClick}
                disabled={!recordedAudioURL}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Dialog open={openResetDialog} onOpenChange={setOpenResetDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Reset</DialogTitle>
            <DialogDescription>
              Are you sure you want to reset the recording? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="danger" onClick={handleResetCancel}>
              Cancel
            </Button>
            <Button onClick={handleResetConfirm}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Warning message */}
      <div className="flex justify-center items-center w-full text-center text-red-500 text-sm">
        Please record for atleat 30 seconds to stop recording.
      </div>
    </div>
  );
};

export default SpeakingTest;
