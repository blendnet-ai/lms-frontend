import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./../styles/Evaluation.css";
import { HomeHeaderContent } from "./Home";
import { auth } from "../configs/firebase";
import { PlayArrow } from "@mui/icons-material";
import { title } from "process";
import { Route, Routes, useNavigate } from "react-router-dom";
import EvalAPI, {
  Assessment,
  GetDashboardDataResponse,
  GetRoutesResponse,
} from "../apis/EvalAPI";
import ProtectedRoute from "../components/ProtectedRoute";
import { CircularProgress } from "@mui/material";

type EvalCardProps = {
  title: string;
  status: string;
  illustration: string;
  onClick: () => void;
  total_test: number;
  tests_attempted: number;
};

function EvalCard(props: EvalCardProps) {
  return (
    <div className="eval-card">
      <img src={`/illustrations/${props.illustration}`} alt="" />
      <div className="eval-inner">
        <h3 className="eval-card-heading">{props.title}</h3>

        <div className="eval-card-status">
          {props.tests_attempted == 0
            ? "Not Started"
            : `Tests attempted: ${props.tests_attempted}/${props.total_test}`}
        </div>
        <div
          className={
            "start-button-container" +
            (props.tests_attempted >= props.total_test
              ? " start-button-container-disabled"
              : "")
          }
          onClick={
            props.tests_attempted >= props.total_test ? () => {} : props.onClick
          }
        >
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
  const [data, setData] = useState<GetDashboardDataResponse[] | null>(null);
  const [resultOut, setResultOut] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.displayName) setName(user?.displayName);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const data = await EvalAPI.getDashboardData();

      // TODO: Remove this
      for (let i = 0; i < data.length; i++) {
        data[i].name = "quant";
      }
      setResultOut(true);
      //

      setData(data);
    })();
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
          {data && (
            <>
              {resultOut && (
                <div
                  onClick={() => {
                    navigate("/report");
                  }}
                  className="Evaluation-report-container"
                >
                  <img src="/illustrations/result-left.svg" alt="" />
                  <div className="Evaluation-report-middle">
                    <div>Your result is out</div>
                    <img src="/illustrations/result-middle.svg" alt="" />
                  </div>
                  <img
                    className="Evaluation-report-right"
                    src="/illustrations/result-right.svg"
                    alt=""
                  />
                </div>
              )}

              <div>
                {data.map((test) => {
                  return (
                    <EvalCard
                      title={test.assessment_display_name}
                      status="Not started"
                      illustration="psychometric-assessment.svg" // TODO: Pass img url here
                      onClick={() => redirectToWelcome(test.name)}
                      tests_attempted={test.number_of_attempts}
                      total_test={test.max_attempts}
                    />
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
      {!props.tests && <CircularProgress />}
    </div>
  );
}

export default Evaluation;
