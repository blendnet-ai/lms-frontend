import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./../styles/Evaluation.css";
import { HomeHeaderContent } from "./Home";
import { auth } from "../configs/firebase";
import { PlayArrow } from "@mui/icons-material";
import { title } from "process";

type EvalCardProps = {
  title: string;
  status: string;
  illustration: string;
};

function EvalCard(props: EvalCardProps) {
  return (
    <div className="eval-card">
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
        <EvalCard
          title="Communication Skills"
          status="Not started"
          illustration="communication-skills.svg"
        />
        <EvalCard
          title="Psychometric Assessment"
          status="Not started"
          illustration="psychometric-assessment.svg"
        />
        <EvalCard
          title="Quantitative Ability"
          status="Not started"
          illustration="quantitative-ability.svg"
        />
      </div>
    </div>
  );
}

export default Evaluation;
