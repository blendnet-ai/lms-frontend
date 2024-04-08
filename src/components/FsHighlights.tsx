import "./../styles/FsHighlights.css";

function Highlight() {
  return (
    <div className="highlight">
      <div>
        <div>Chapter Vocab</div>
        <div>1 min</div>
      </div>
    </div>
  );
}

function FsHighlights() {
  return (
    <div className="FsHighlights">
      <h1>Highlights</h1>
      <div className="highlights-container">
        <Highlight />
        <Highlight />
        <Highlight />
        <Highlight />
      </div>
    </div>
  );
}

export default FsHighlights;
