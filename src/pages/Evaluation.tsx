import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./../styles/Evaluation.css";
import { HomeHeaderContent } from "./Home";
import { auth } from "../configs/firebase";
import { PlayArrow } from "@mui/icons-material";
import { title } from "process";
import { Route, Routes, useNavigate } from "react-router-dom";
import EvalAPI, { Assessment, GetRoutesResponse } from "../apis/EvalAPI";
import ProtectedRoute from "../components/ProtectedRoute";
import { CircularProgress } from "@mui/material";

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

export type EvaluationTestElement = {
  heading: string;
  name: string;
  img_url: string;
};

type EvaluationProps = {
  tests: EvaluationTestElement[];
};

function Evaluation(props: EvaluationProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.displayName) setName(user?.displayName);
    });
  }, []);

  const navigate = useNavigate();

  const redirectToWelcome = async (name: string) => {
    navigate(`/${name}-welcome`);
  };

  return (
    <div className="Evaluation">
      {props.tests && (
        <>
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
            {props.tests.map((test) => {
              return (
                <EvalCard
                  title={test.heading}
                  status="Not started"
                  illustration="psychometric-assessment.svg"
                  onClick={() => redirectToWelcome(test.name)}
                />
              );
            })}
            {/* <EvalCard
          title="Communication Skills"
          status="Not started"
          illustration="communication-skills.svg"
          onClick={redirectToPersonalityWelcome}
        /> */}

            {/* <EvalCard
          title="Quantitative Ability"
          status="Not started"
          illustration="quantitative-ability.svg"
          onClick={redirectToPersonalityWelcome}
        /> */}
          </div>
        </>
      )}
      {!props.tests && <CircularProgress />}
    </div>
  );
}

export default Evaluation;
