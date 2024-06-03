import { Box, Divider, IconButton, LinearProgress } from "@mui/material";
import CustomCircularProgress from "../../components/CustomCircularProgress/CustomCircularProgress";
import Header from "../../components/Header/Header";
import "./EvalReport.css";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { ReactElement, ReactNode, useEffect, useState } from "react";
import { StringLiteral } from "typescript";
import EvalAPI, {
  GetReportResponse,
  ReportInnerData,
  ReportScoreSubSection,
  ReportStatus,
} from "../../apis/EvalAPI";
import { auth } from "./../../configs/firebase";
import { HomeHeaderContent } from "../Home/Home";
import useUserData from "../../hooks/useUserData";
import PERSONALITY from "../../configs/personality";
import { CalculationsUtil } from "../../utils/calculations";
import { emojis, images } from "./../../assets";

const colors = ["#f1f5ff", "#FAF1FF", "#FFEDDD", "#EEFFDD"];

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
          <img src={emojis[props.emoji]} alt="" />
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
        <img src={emojis[props.emoji]} alt="" />
        <div className="TestCardInnerType1Cell-heading">{props.heading}</div>
      </div>
      <div>{props.des}</div>
    </div>
  );
}

type TestCardInnerType1Props = {
  personality?:
    | "INTJ"
    | "INTP"
    | "ENTJ"
    | "ENTP"
    | "INFJ"
    | "INFP"
    | "ENFJ"
    | "ENFP"
    | "ISTJ"
    | "ISFJ"
    | "ESTJ"
    | "ESFJ"
    | "ISTP"
    | "ISFP"
    | "ESTP"
    | "ESFP";
};

function TestCardInnerType1(props: TestCardInnerType1Props) {
  return (
    <div className="TestCardInnerType1">
      <TestCardInnerType1Cell
        emoji="user-square"
        index={0}
        heading="Personality overview"
        des={
          props.personality ? PERSONALITY[props.personality].personality : ""
        }
      />
      <TestCardInnerType1Cell
        emoji="like-dislike"
        index={1}
        heading="Strength and weakness"
        des={
          props.personality
            ? PERSONALITY[props.personality].strength_and_weakness
            : ""
        }
      />
      <TestCardInnerType1Cell
        emoji="briefcase"
        index={2}
        heading="Job suggested and avoidable career paths"
        des={
          props.personality ? PERSONALITY[props.personality].career_path : ""
        }
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
              Incorrect: {props.data.incorrect}
            </div>
            <div className="TestScoreCard-text-na">
              Not Attempted: {props.data.not_attempted}
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
  cpInnerValue?: string;
  children?: ReactNode;
  short_description?: string;
  completed: boolean;
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
          {props.completed && (
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
        <div className="TestCard-inner">
          <div className="TestCard-cirprogess-container">
            <CustomCircularProgress
              filledValue={(() => {
                if (props.cpFilledValue) {
                  return props.cpFilledValue;
                }
                if (props.completed) {
                  return 100;
                }
              })()}
              innerValue={props.cpInnerValue ? props.cpInnerValue : "--"}
              innerColor={"rgba(255, 255, 255, 0)"}
            />
            {props.cpFilledValue != null && (
              <div className="TestCard-netscore">Net Score</div>
            )}
          </div>
          <div className="TestCard-text-container">
            <div className="TestCard-text-attempt">
              Last attempt:{" "}
              {CalculationsUtil.formatDateTime(props.last_attempt)}
            </div>
            <div className="TestCard-text-divider"> </div>
            {props.performanceTag && (
              <>
                <div className="TestCard-text-perf">Overall performance</div>
                <div className="TestCard-text-tag">{props.performanceTag}</div>
              </>
            )}
            {props.short_description && (
              <div
                className={
                  "TestCard-text-sd" +
                  (props.completed ? "" : " TestCard-text-sd-incomplete")
                }
              >
                {props.short_description}
              </div>
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

  const getTestIncompleteText = (status: ReportStatus) => {
    if (status == ReportStatus.EVALUATION_PENDING) {
      return "Evaluation under progress";
    } else if (status == ReportStatus.ABANDONED) {
      return "Evaluation was abandoned by you";
    } else if (status == ReportStatus.IN_PROGRESS) {
      return "Test is in progress";
    }
  };

  const { name } = useUserData();

  return (
    <div className="EvalReport">
      <Header
        content={
          <HomeHeaderContent
            heading={`Hi ${name},`}
            content=""
            profile={name?.at(0)}
          />
        }
      />
      {data && data.length == 0 && (
        <div className="EvalReport-0tests-container">
          <img
            className="EvalReport-0tests-img"
            src={images.reportImage}
            alt=""
          />
          <h2>Your scores will be available soon</h2>
        </div>
      )}
      {data && data.length != 0 && (
        <div className="EvalReport-TestCard-container">
          {data.map((test) => {
            if (test.status == ReportStatus.COMPLETED) {
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
                  completed={true}
                >
                  {(test.type == 0 || test.type == 1) &&
                    test.additional_data && (
                      <TestCardInnerType0 data={test.additional_data} />
                    )}
                  {test.type == 2 && (
                    <TestCardInnerType1 personality={test.score_text} />
                  )}
                </TestCard>
              );
            } else {
              return (
                <TestCard
                  heading={test.heading}
                  short_description={getTestIncompleteText(test.status)}
                  last_attempt={test.last_attempt}
                  completed={false}
                ></TestCard>
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
