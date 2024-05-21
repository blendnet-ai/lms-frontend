import Button from "@mui/material/Button";
import "./../styles/Landing.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../configs/firebase";

type OfferingCardProps = {
  title: string;
  description: string;
  illustration: string;
};

function OfferingCard(props: OfferingCardProps) {
  return (
    <div className="offering">
      <img
        className="offering-illustraion"
        src={`/illustrations/${props.illustration}`}
        alt=""
      />
      <h3 className="offering-heading">{props.title}</h3>
      <div className="offering-description">{props.description}</div>
    </div>
  );
}

type EvaluateSkillsProps = {
  title: string;
  description: string;
  // page: string;
  illustration: string;
  reverse?: boolean;
  onTakeATestClicked: () => void;
};

function EvaluateSkills(props: EvaluateSkillsProps) {
  let textClassName = "eval-skills-text";
  let descriptionClassName = "offering-description";
  let illustraionClassName = "";

  if (props.reverse) {
    textClassName += " eval-skills-text-right";
    descriptionClassName += " offering-description-right";
    illustraionClassName = "eval-illustraion-left";
  } else {
    textClassName += " eval-skills-text-left";
    descriptionClassName += " offering-description-left";
    illustraionClassName = "eval-illustraion-right";
  }
  return (
    <div className="eval-skills">
      <div className={textClassName}>
        <h3 className="eval-heading">{props.title}</h3>
        <div className={descriptionClassName}>{props.description}</div>
      </div>
      <div className="eval-skills-bottom">
        {!props.reverse && (
          <button className="trial-button" onClick={props.onTakeATestClicked}>
            Take a test
          </button>
        )}
        <img
          className={illustraionClassName}
          src={`/illustrations/${props.illustration}`}
          alt=""
        />
        {props.reverse && (
          <button className="trial-button" onClick={props.onTakeATestClicked}>
            Take a test
          </button>
        )}
      </div>
    </div>
  );
}

function Landing() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate(`/login`);
  };
  const navigateToHome = () => {
    navigate(`/home`);
  };

  const navigateToLoginOrHome = () => {
    if (isLoggedin) {
      navigateToHome();
    } else {
      navigateToLogin();
    }
  };

  const [isLoggedin, setLoggedin] = useState<boolean>(auth.currentUser != null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedin(true);
      } else setLoggedin(false);
    });
  }, []);

  return (
    <div className="Landing">
      <div className="header">
        <h1>Welcome to aspireworks</h1>
        <div className="evaluate-text">Evaluate, upskill and get placed</div>
        {!isLoggedin && (
          <button className="trial-button" onClick={navigateToLogin}>
            Start free trial Today!
          </button>
        )}
        {isLoggedin && (
          <button className="trial-button" onClick={navigateToHome}>
            Home
          </button>
        )}

        <div className="illustraion-container">
          <img
            className="illustraion"
            src="/illustrations/landing.svg"
            alt=""
          />
        </div>
      </div>
      <h2 className="heading">We Offer</h2>
      <OfferingCard
        title="Test your current skills"
        description="Take a comprehensive evaluation to identify your strengths and ares of development."
        illustration="test-skills.svg"
      />
      <OfferingCard
        title="Industry-Ready Learning"
        description="Take courses specially designed to equip you with the skills needed in today's competitive job market."
        illustration="industry-ready.svg"
      />
      <OfferingCard
        title="Placement Support"
        description="Leverage our placement network to explore jobs that align with your skills and knowledge."
        illustration="placement-support.svg"
      />
      <h2 className="heading">Evaluate your skills</h2>
      <EvaluateSkills
        onTakeATestClicked={navigateToLoginOrHome}
        title="Communication Skills"
        description="Test your language abilities and get a detailed feedback report to understand your strengths and areas for improvement."
        illustration="communication-skills.svg"
      />
      <EvaluateSkills
        onTakeATestClicked={navigateToLoginOrHome}
        title="Psychometric Assessment"
        description="Complete this personality test and discover which career paths best match your unique personality profile."
        illustration="psychometric-assessment.svg"
        reverse
      />
      <EvaluateSkills
        onTakeATestClicked={navigateToLoginOrHome}
        title="Logical Reasoning"
        description="Evaluate your numerical skills through this test designed to measure your aptitude in handling quantitative tasks effectively."
        illustration="quantitative-ability.svg"
      />
      <EvaluateSkills
        onTakeATestClicked={navigateToLoginOrHome}
        title="Coding Skills"
        description="Leverage our placement network to explore jobs that align with your skills and knowledge. "
        illustration="psychometric-assessment.svg"
        reverse
      />
      <footer>
        <h3 className="footer-heading">aspireworks</h3>
        <div className="footer-description">
          Gain industry-ready skills and secure your dream job in 3 simple steps
        </div>
        <a href="https://in.linkedin.com/company/blendnetai" target="_blank">
          <img
            className="illustraion"
            src="/icons/linkedin.svg"
            alt=""
            style={{ width: "24px" }}
          />
        </a>
      </footer>
    </div>
  );
}

export default Landing;
