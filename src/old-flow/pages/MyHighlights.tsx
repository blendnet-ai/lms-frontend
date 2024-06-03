import "./../styles/MyHighlights.css";

function Highlight() {
  return (
    <div className="highlight">
      <img
        src="https://lh3.googleusercontent.com/a/ACg8ocIYLWmBqJiq6HRu4WPKEMd2aQnY383Y7Bo7Qd1lgtirTaNlLQ=s96-c"
        alt=""
        className="video-img"
      />
      <div>
        <div>Chapter Vocab</div>
        <div>1 min</div>
      </div>
    </div>
  );
}

function MyHighlights() {
  return (
    <div className="MyHighlights">
      <h1>My Highlights</h1>
      <div className="highlights-container">
        <Highlight />
        <Highlight />
        <Highlight />
        <Highlight />
      </div>
    </div>
  );
}

export default MyHighlights;
