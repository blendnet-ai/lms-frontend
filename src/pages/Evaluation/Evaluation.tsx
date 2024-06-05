import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./Evaluation.css";
import { HomeHeaderContent } from "../Home/Home";
import { PlayArrow } from "@mui/icons-material";
import { title } from "process";
import { Route, Routes, useNavigate } from "react-router-dom";
import EvalAPI, {
  Assessment,
  GetDashboardDataResponse,
  GetRoutesResponse,
} from "../../apis/EvalAPI";
import { CircularProgress } from "@mui/material";
import { images } from "../../assets";
import useUserData from "../../hooks/useUserData";
import formatName from "../../utils/formatName";

type EvalCardProps = {
  title: string;
  status: string;
  illustration: string;
  onClick: () => void;
  total_test: number;
  tests_attempted: number;
};

function EvalCard(props: EvalCardProps) {
  const [isImgLoaded, setImgIsLoaded] = useState(false);

  return (
    <div className="eval-card">
      {!isImgLoaded && (
        <img src={images.evalHomePlaceholder} alt="placeholder" />
      )}
      <img
        src={props.illustration}
        onLoad={() => setImgIsLoaded(true)}
        style={isImgLoaded ? {} : { display: "none" }}
        alt=""
      />

      <div className="eval-inner">
        <h3 className="eval-card-heading">{props.title}</h3>

        <div className="eval-card-status">
          {props.tests_attempted === 0
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
  const { name } = useUserData();
  const [data, setData] = useState<GetDashboardDataResponse[] | null>(null);
  const [resultOut, setResultOut] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await EvalAPI.getDashboardData();

      let anyReportIsReady = false;
      for (let i = 0; i < data.length; i++) {
        if (data[i].status === "Completed") {
          anyReportIsReady = true;
          break;
        }
      }
      if (anyReportIsReady) setResultOut(true);

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
                heading={`Hi ${
                  name &&
                  formatName(name, {
                    firstNameOnly: true,
                    lastNameOnly: false,
                    upperCase: false,
                    lowerCase: false,
                    titileCase: false,
                    sentenceCase: true,
                  })
                }`}
                content="Here are your list of test, It will help you to evaluate your skills."
                profile={name ? name.charAt(0).toUpperCase() : ""}
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
                  <img src={images.resultLeft} alt="" />
                  <div className="Evaluation-report-middle">
                    <div className="Evaluation-report-middle-text">
                      Your result is out
                    </div>
                    <img src={images.resultMiddle} alt="" />
                  </div>
                  <img
                    className="Evaluation-report-right"
                    src={images.resultRight}
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
                      illustration={test.img_url} // TODO: Pass img url here
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
