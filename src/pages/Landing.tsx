import Button from "@mui/material/Button";
import "./../styles/Landing.css";

function Landing() {
  return (
    <div className="Landing">
      <div className="header">
        <h1>Welcome to aspireworks</h1>
        <div className="evaluate-text">Evaluate, upskill and get placed</div>
        <button className="trial-button">Start free trial Today!</button>
        <div className="illustraion-container">
          <img
            className="illustraion"
            src="/illustrations/landing.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Landing;
