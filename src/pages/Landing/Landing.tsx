import "./Landing.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../configs/firebase";
import { icons, images } from "../../assets";
import { Box, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
type OfferingCardProps = {
  title: string;
  description: string;
  illustration: string;
};

function OfferingCard(props: OfferingCardProps) {
  return (
    <div className="offering">
      <img className="offering-illustraion" src={props.illustration} alt="" />
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
        <img className={illustraionClassName} src={props.illustration} alt="" />
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
          <img className="illustraion" src={images.landing} alt="" />
        </div>
      </div>
      <h2 className="heading">What We Offer</h2>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "0px", md: "20px" },
          padding: { xs: "0px", md: "20px" },
        }}
      >
        <OfferingCard
          title="360° Assessment:"
          description="Comprehensive evaluation and skill mapping for your job readiness."
          illustration={images.testSkills}
        />
        <OfferingCard
          title="AI-powered skilling"
          description="Free courses and certifications for your upskilling."
          illustration={images.industryReady}
        />
        <OfferingCard
          title="Placement Support"
          description="Unlock job opportunities curated for you from our extensive industry network."
          illustration={images.placementSupport}
        />
      </Box>
      <h2 className="heading">
        Are you industry ready? Evaluate your skills today!
      </h2>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: "0px", md: "20px" },
          padding: { xs: "0px", md: "20px" },
        }}
      >
        <EvaluateSkills
          onTakeATestClicked={navigateToLoginOrHome}
          title="Communication Skills"
          description="Evaluate your communication skills that are required for a successful industry leader."
          illustration={images.communicationSkills}
        />
        <EvaluateSkills
          onTakeATestClicked={navigateToLoginOrHome}
          title="Psychometric Assessment"
          description="Complete our psychometric tests to discover which career paths best match your unique personality profile."
          illustration={images.psychometricAssessment}
          reverse
        />
        <EvaluateSkills
          onTakeATestClicked={navigateToLoginOrHome}
          title="Quantitative Aptitude"
          description="Test your Logical Reasoning, Analytical and Critical Thinking skills required for top positions."
          illustration={images.quantitativeAbility}
        />
      </Box>
      {/* <EvaluateSkills
        onTakeATestClicked={navigateToLoginOrHome}
        title="Coding Skills"
        description="Leverage our placement network to explore jobs that align with your skills and knowledge. "
        illustration="psychometric-assessment.svg"
        reverse
      /> */}
      <footer>
        <h3 className="footer-heading">aspireworks</h3>
        <div className="footer-description">
          Gain industry-ready skills and secure your dream job in 3 simple steps
        </div>
        {/* social media links */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <IconButton href="" target="_blank" color="primary" size="large">
            <LinkedInIcon />
          </IconButton>
          <IconButton href="" target="_blank" color="info" size="large">
            <FacebookIcon />
          </IconButton>
          <IconButton
            href=""
            size="large"
            target="_blank"
            sx={{
              color: "black",
            }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            href=""
            size="large"
            target="_blank"
            sx={{
              color: "pink",
            }}
          >
            <InstagramIcon />
          </IconButton>
        </Box>
      </footer>
    </div>
  );
}

export default Landing;
