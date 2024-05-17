import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./../styles/Evaluation.css";
import { HomeHeaderContent } from "./Home";
import { auth } from "../configs/firebase";
import { PlayArrow } from "@mui/icons-material";
import { title } from "process";
import { useNavigate } from "react-router-dom";
import EvalAPI, { Assessment } from "../apis/EvalAPI";

type EvalCardProps = {
  title: string;
  status: string;
  illustration: string;
  onClick: () => void;
};

function EvalCard(props: EvalCardProps) {
  return (
    <div className="eval-card" onClick={props.onClick}>
      <img src={`/illustrations/${props.illustration}`} alt="" />
      <div className="eval-inner">
        <h3 className="eval-card-heading">{props.title}</h3>
        <div className="eval-card-status">{props.status}</div>
        <div className="start-button-container">
          <PlayArrow fontSize="large" style={{ color: "white" }} />
        </div>
      </div>
    </div>
  );
}
function Evaluation() {
  const [name, setName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.displayName) setName(user?.displayName);
    });
  }, []);

  const navigate = useNavigate();

  const redirectToPersonalityWelcome = async () => {
    navigate("/personality-welcome");
  };

  return (
    <div className="Evaluation">
      <Header
        content={
          <HomeHeaderContent
            heading={`Hi ${name},`}
            content="Here are your list of test, It will help you to evaluate your skills."
            profile={name.at(0)}
          />
        }
      />
      <div>
        {/* <EvalCard
          title="Communication Skills"
          status="Not started"
          illustration="communication-skills.svg"
          onClick={redirectToPersonalityWelcome}
        /> */}
        <EvalCard
          title="Psychometric Assessment"
          status="Not started"
          illustration="psychometric-assessment.svg"
          onClick={redirectToPersonalityWelcome}
        />
        {/* <EvalCard
          title="Quantitative Ability"
          status="Not started"
          illustration="quantitative-ability.svg"
          onClick={redirectToPersonalityWelcome}
        /> */}
      </div>
    </div>
  );
}

export default Evaluation;
