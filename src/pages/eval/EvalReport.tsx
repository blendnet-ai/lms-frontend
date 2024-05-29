import { Box, Divider, IconButton, LinearProgress } from "@mui/material";
import CustomCircularProgress from "../../components/CustomCircularProgress";
import Header from "../../components/Header";
import "./../../styles/eval/EvalReport.css";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { StringLiteral } from "typescript";
import EvalAPI, {
  GetReportResponse,
  ReportInnerData,
  ReportScoreSubSection,
} from "../../apis/EvalAPI";
import { auth } from "./../../configs/firebase";

const colors = ["#f1f5ff", "#FAF1FF", "#FFEDDD", "#EEFFDD"];

function HeaderContent() {
  const [name, setName] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.displayName) setName(user?.displayName);
    });
  }, []);
  return (
    <div className="HeaderContent">
      <h2 className="HeaderContent-heading">Hi {name}</h2>
    </div>
  );
}

type TestScoreCardContentCellProps = {
  name: string;
  value: number;
};

function TestScoreCardContentCell(props: TestScoreCardContentCellProps) {
  return (
    <div className="TestScoreCardContentCell">
      <div className="TestScoreCardContentCell-value">{`${props.value}%`}</div>
      <div className="TestScoreCardContentCell-inner">
        <div>{props.name}</div>
        <Box sx={{ width: "50%" }}>
          <LinearProgress variant="determinate" value={props.value} />
        </Box>
      </div>
    </div>
  );
}
type TestScoreCardContentProps = {
  sections: ReportScoreSubSection[];
};

function TestScoreCardContent(props: TestScoreCardContentProps) {
  return (
    <div className="TestScoreCardContent">
      {props.sections.map((section, i, arr) => {
        return (
          <>
            <TestScoreCardContentCell
              name={section.name}
              value={section.percentage}
            />
            {i != arr.length - 1 && <Divider />}
          </>
        );
      })}
    </div>
  );
}

type TestScoreCardProps = {
  name: string;
  value: string;
  children: ReactNode;
  isExpandable: boolean;
  index: number;
  emoji: string;
};

function TestScoreCard(props: TestScoreCardProps) {
  const [contentVisible, setContentVisible] = useState(false);
  console.log("index");
  console.log(props.index);

  const handleOnExplandMoreClick = () => {
    setContentVisible((prev) => !prev);
  };
  return (
    <div
      className="TestScoreCard"
      style={{ backgroundColor: colors[props.index % colors.length] }}
    >
      <div className="TestScoreCard-card">
        <div className="TestScoreCard-inner">
          <img src={`/emojis/${props.emoji}.svg`} alt="" />
          <div>
            <div className="TestScoreCard-name">{props.name}</div>
            <div className="TestScoreCard-value">{props.value}</div>
          </div>
        </div>
        {props.isExpandable && (
          <IconButton
            onClick={handleOnExplandMoreClick}
            style={{ color: "#262D45", margin: "0px", padding: "0px" }}
          >
            {contentVisible ? (
              <ExpandLess fontSize="large" />
            ) : (
              <ExpandMore fontSize="large" />
            )}
          </IconButton>
        )}
      </div>
      {contentVisible && props.children}
    </div>
  );
}

type TestCardInnerType1CellProps = {
  heading: string;
  des: string;
  index: number;
  emoji: string;
};

function TestCardInnerType1Cell(props: TestCardInnerType1CellProps) {
  return (
    <div
      className="TestCardInnerType1Cell"
      style={{ backgroundColor: colors[props.index % colors.length] }}
    >
      <div className="TestCardInnerType1Cell-head">
        <img src={`/emojis/${props.emoji}.svg`} alt="" />
        <div className="TestCardInnerType1Cell-heading">{props.heading}</div>
      </div>
      <div>{props.des}</div>
    </div>
  );
}
function TestCardInnerType1() {
  return (
    <div className="TestCardInnerType1">
      <TestCardInnerType1Cell
        emoji="user-square"
        index={0}
        heading="Personality overview"
        des="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <TestCardInnerType1Cell
        emoji="like-dislike"
        index={1}
        heading="Strength and weakness"
        des="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
      <TestCardInnerType1Cell
        emoji="briefcase"
        index={2}
        heading="Job suggested and avoidable career paths"
        des="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      />
    </div>
  );
}

type TestCardInnerType0Props = {
  data: ReportInnerData;
};

function TestCardInnerType0(props: TestCardInnerType0Props) {
  return (
    <div>
      <div className="TestScoreCard-container">
        {props.data.correct != null && (
          <div className="TestScoreCard-text-container">
            <div className="TestScoreCard-text-correct">
              Correct: {props.data.correct}
            </div>
            <div className="TestScoreCard-text-incorrect">
              Incorrect: {props.data.correct}
            </div>
            <div className="TestScoreCard-text-na">
              Not Attempted: {props.data.correct}
            </div>
          </div>
        )}

        {props.data.sections?.map((section, i, arr) => {
          return (
            <TestScoreCard
              emoji={section.emoji}
              index={i}
              name={section.name}
              value={`${section.percentage}%`}
              isExpandable={
                section.sections != null && section.sections.length != 0
              }
            >
              {section.sections && (
                <TestScoreCardContent sections={section.sections} />
              )}
            </TestScoreCard>
          );
        })}
      </div>
    </div>
  );
}

type TestCardProps = {
  heading: string;
  last_attempt: string;
  performanceTag?: string;
  cpFilledValue?: number;
  cpInnerValue: string;
  children: ReactNode;
  short_description?: string;
};

function TestCard(props: TestCardProps) {
  const [contentVisible, setContentVisible] = useState(false);

  const handleOnExplandMoreClick = () => {
    setContentVisible((prev) => !prev);
  };

  return (
    <div className="TestCard">
      <div className="TestCard-card">
        <div className="TestCard-head">
          <div className="TestCard-heading">{props.heading}</div>
          <IconButton
            onClick={handleOnExplandMoreClick}
            style={{ color: "#262D45", margin: "0px", padding: "0px" }}
          >
            {contentVisible ? (
              <ExpandLess fontSize="large" />
            ) : (
              <ExpandMore fontSize="large" />
            )}
          </IconButton>
        </div>
        <div className="TestCard-inner">
          <div className="TestCard-cirprogess-container">
            <CustomCircularProgress
              filledValue={props.cpFilledValue ? props.cpFilledValue : 100}
              innerValue={props.cpInnerValue}
              innerColor={"rgba(255, 255, 255, 0)"}
            />
            {props.cpFilledValue != null && (
              <div className="TestCard-netscore">Net Score</div>
            )}
          </div>
          <div className="TestCard-text-container">
            <div className="TestCard-text-attempt">
              Last attempt: {props.last_attempt}
            </div>
            <div className="TestCard-text-divider"> </div>
            {props.performanceTag && (
              <>
                <div className="TestCard-text-perf">Overall performance</div>
                <div className="TestCard-text-tag">{props.performanceTag}</div>
              </>
            )}
            {props.short_description && (
              <div className="TestCard-text-sd">{props.short_description}</div>
            )}
          </div>
        </div>
      </div>
      {contentVisible && (
        <>
          <Divider /> {props.children}
        </>
      )}
    </div>
  );
}

export default function EvalReport() {
  const [data, setData] = useState<GetReportResponse[] | null>(null);

  useEffect(() => {
    (async () => {
      const data = await EvalAPI.getReport();
      setData(data);
    })();
  }, []);

  return (
    <div className="EvalReport">
      <Header content={<HeaderContent />} />
      {data && data.length == 0 && (
        <div className="EvalReport-0tests-container">
          <img
            className="EvalReport-0tests-img"
            src="/illustrations/report.svg"
            alt=""
          />
          <h2>Your scores will be available soon</h2>
        </div>
      )}
      {data && data.length != 0 && (
        <div className="EvalReport-TestCard-container">
          {data.map((test) => {
            return (
              <TestCard
                heading={test.heading}
                short_description={test.short_description}
                last_attempt={test.last_attempt}
                performanceTag={test.performance_tag}
                cpFilledValue={test.percentage}
                cpInnerValue={
                  test.score_text ? test.score_text : `${test.percentage}%`
                }
              >
                {(test.type == 0 || test.type == 1) && test.additional_data && (
                  <TestCardInnerType0 data={test.additional_data} />
                )}
                {test.type == 2 && <TestCardInnerType1 />}
              </TestCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
