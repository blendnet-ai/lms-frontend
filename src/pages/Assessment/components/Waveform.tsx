import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

// Define props for the Waveform component
interface WaveformProps {
  url: string;
  playing: boolean;
  onFinish: () => void;
  width: string | number; // You may specify 'number' if width is always a number
  playbackSpeed?: number;
}

// Define the options for WaveSurfer, based on a container ref
const formWaveSurferOptions = (
  ref: HTMLElement,
  playbackSpeed: number = 1
) => ({
  container: ref,
  waveColor: "#D9D9D9",
  progressColor: "#CFE4FF",
  cursorColor: "#D9D9D9",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 80,
  normalize: true,
  partialRender: true,
  audioRate: playbackSpeed || 1,
});

export default function Waveform({
  url,
  playing,
  onFinish,
  width,
  playbackSpeed = 1,
}: WaveformProps) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    try {
      if (waveformRef.current) {
        const options = formWaveSurferOptions(
          waveformRef.current,
          playbackSpeed
        );
        wavesurfer.current = WaveSurfer.create(options);
        wavesurfer.current.load(url);

        wavesurfer.current.on("finish", () => {
          onFinish();
        });
      }
      return () => {
        wavesurfer.current?.destroy();
      };
    } catch (err) {
      console.error(err);
    }
  }, [url, onFinish]);

  useEffect(() => {
    try {
      if (playing) wavesurfer.current?.play();
      else wavesurfer.current?.pause();
    } catch (err) {
      console.error(err);
    }
  }, [playing]);

  useEffect(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setPlaybackRate(playbackSpeed);
    }
  }, [playbackSpeed]);

  return (
    <div
      style={{
        border: "1px solid #2059EE",
        padding: "2px",
        width: width,
        borderRadius: "10px",
        marginLeft: "7rem",
      }}
    >
      <div id="waveform" ref={waveformRef} />
    </div>
  );
}
