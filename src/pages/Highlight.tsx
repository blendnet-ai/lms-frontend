import ReactPlayer from "react-player";
import "./../styles/Highlight.css";

function Highlight() {
  return (
    <div className="Highlight">
      <h1>My Highlight</h1>
      <div className="player-wrapper">
        <ReactPlayer
          id="player"
          //   ref={playerRef}
          className="react-player"
          pip
          width="100%"
          //   playing={isPlaying}
          //   onPlay={() => setIsPlaying(true)}
          //   onPause={() => setIsPlaying(false)}
          url="https://www.youtube.com/watch?v=wjZofJX0v4M"
          controls
        />
        <h3>Summary</h3>
        <div>
          Plants convert sunlight, water, and carbon dioxide into every living
          thing through the Calvin Cycle. The cycle requires 9 molecules of ATP
          and 6 molecules of NADPH to convert 3 RuBPs into 6 G3Ps. Only one G3P
          gets to leave the cycle, while the others are needed to regenerate the
          original 3 Ribulose Bisphosphates. The regeneration is the last phase
          of the Calvin Cycle
        </div>
        <h3>Transcript</h3>
        <div>
          Plants convert sunlight, water, and carbon dioxide into every living
          thing through the Calvin Cycle. The cycle requires 9 molecules of ATP
          and 6 molecules of NADPH to convert 3 RuBPs into 6 G3Ps. Only one G3P
          gets to leave the cycle, while the others are needed to regenerate the
          original 3 Ribulose Bisphosphates. The regeneration is the last phase
          of the Calvin Cycle
        </div>
      </div>
    </div>
  );
}

export default Highlight;
