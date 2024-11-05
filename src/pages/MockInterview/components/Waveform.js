import { useEffect, useRef } from "react";

import WaveSurfer from "wavesurfer.js";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#D9D9D9",
  progressColor: "#9996E2",
  cursorColor: "#D9D9D9",
  barWidth: 3,
  barRadius: 3,
  responsive: true,
  height: 80,
  normalize: true,
  partialRender: true,
});

export default function Waveform({ url, playing, onFinish }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);

  useEffect(() => {
    try {
      const options = formWaveSurferOptions(waveformRef.current);
      wavesurfer.current = WaveSurfer.create(options);
      wavesurfer.current.load(url);

      wavesurfer.current.on("finish", () => {
        onFinish();
      });
      return () => wavesurfer.current.destroy();
    } catch (err) {
      console.error(err);
    }
  }, [url]);

  useEffect(() => {
    try {
      if (playing) wavesurfer.current.play();
      else wavesurfer.current.pause();
    } catch (err) {
      console.error(err);
    }
  }, [playing]);

  return (
    <div
      style={{
        border: "1px solid #c5a8fa",
        padding: "2px",
        width: "60vw",
        borderRadius: "10px",
      }}
    >
      <div id="waveform" ref={waveformRef} />
    </div>
  );
}