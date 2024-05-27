import { Divider } from "@mui/material";
import CustomCircularProgress from "../../components/CustomCircularProgress";
import Header from "../../components/Header";
import "./../../styles/eval/EvalReport.css";

function HeaderContent() {
  return (
    <div className="HeaderContent">
      <h2 className="HeaderContent-heading">Hi Vitika</h2>
      <div className="HeaderContent-content">Your overall score</div>
    </div>
  );
}

type TestCardProps = {
  heading: string;
  attemptNumber: number;
  performanceTag: string;
  cpFilledValue: number;
  cpInnerValue: string;
};

function TestCard(props: TestCardProps) {
  return (
    <div className="TestCard">
      <div className="TestCard-heading">{props.heading}</div>
      <div className="TestCard-inner">
        <div className="TestCard-cirprogess-container">
          <CustomCircularProgress
            filledValue={props.cpFilledValue}
            innerValue={props.cpInnerValue}
            innerColor={"rgba(255, 255, 255, 0)"}
          />
          <div className="TestCard-netscore">Net Score</div>
        </div>
        <div className="TestCard-text-container">
          <div className="TestCard-text-attempt">
            Attempt {props.attemptNumber}
          </div>
          <div className="TestCard-text-divider"> </div>
          <div className="TestCard-text-perf">Overall performance</div>
          <div className="TestCard-text-tag">{props.performanceTag}</div>
        </div>
      </div>
    </div>
  );
}

export default function EvalReport() {
  return (
    <div className="EvalReport">
      <Header content={<HeaderContent />} />
      <div className="EvalReport-TestCard-container">
        <TestCard
          heading="Communication Skills"
          attemptNumber={1}
          performanceTag="COMPETENT"
          cpFilledValue={90}
          cpInnerValue="90%"
        />
        <TestCard
          heading="Quantative Ability"
          attemptNumber={1}
          performanceTag="COMPETENT"
          cpFilledValue={90}
          cpInnerValue="90%"
        />
        <TestCard
          heading="Psychometric Assessment"
          attemptNumber={1}
          performanceTag="COMPETENT"
          cpFilledValue={90}
          cpInnerValue="90%"
        />
      </div>
    </div>
  );
}
