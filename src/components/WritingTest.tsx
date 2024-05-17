import "./../styles/WritingTest.css";

function WritingTest() {
  return (
    <div className="WritingTest">
      <div className="WritingTest-inner">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </div>

        <textarea></textarea>
        <div className="WritingTest-button-container">
          <button className="trial-button">Clear response</button>
          <button className="trial-button">Skip</button>
          <button className="trial-button">Next</button>
        </div>
      </div>
    </div>
  );
}

export default WritingTest;
