import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import EvalAPI, {
  MCQQuestionResponse,
  MMCQQuestionResponse,
} from "../../apis/EvalAPI";
import "./../../styles/eval/TestQuestionWrapper.css";
import MCQTest from "./MCQTest";
import MMCQTest from "./MMCQTest";
import { Co2Sharp } from "@mui/icons-material";

type PersonalityMCQProps = {
  questionId: number;
  assessmentId: number;
  nextPage: () => void;
  submittedValue: number | (number | null)[] | null;
  updateSubmittedValue: (
    questionId: number,
    value: number | (number | null)[] | null
  ) => void;
  skippable: boolean;
};

enum ANSWER_TYPE {
  MCQ = 0,
  MMCQ = 1,
}

function TestQuestionWrapper(props: PersonalityMCQProps) {
  const [data, setData] = useState<
    MCQQuestionResponse | MMCQQuestionResponse | null
  >(null);
  const [value, setValue] = useState(props.submittedValue);

  useEffect(() => {
    (async () => {
      const fetchedData = await EvalAPI.getQuestion(
        props.questionId,
        props.assessmentId
      );
      setData(fetchedData);
    })();
  }, [props.questionId, props.assessmentId]);

  const onClearResponse = () => {
    setValue(null);
  };

  const submitAndNext = () => {
    if (value === null) return;
    props.updateSubmittedValue(props.questionId, value);

    if (data?.answer_type == ANSWER_TYPE.MCQ) {
      const mcqValue = value as number;
      EvalAPI.submitMCQ(props.questionId, props.assessmentId, mcqValue);
    }
    if (data?.answer_type == ANSWER_TYPE.MMCQ) {
      const mmcqValue = value as (number | null)[];
      EvalAPI.submitMMCQ(props.questionId, props.assessmentId, mmcqValue);
    }

    props.nextPage();
  };

  const isNextDisabled = () => {
    if (data?.answer_type === ANSWER_TYPE.MCQ) {
      return value === null;
    } else if (data?.answer_type === ANSWER_TYPE.MMCQ) {
      const mmcqValue = value as (null | number)[] | null;
      if (mmcqValue == null) {
        return true;
      }
      let nullValue = false;
      mmcqValue.map((value) => {
        if (value === null) {
          nullValue = true;
        }
      });
      return nullValue;
    }
  };

  return (
    <div className="TestQuestionWrapper">
      {!data && (
        <div className="TestQuestionWrapper-CircularProgress">
          <CircularProgress size={100} />
        </div>
      )}
      {data && (
        <div className="TestQuestionWrapper-inner">
          {(() => {
            if (data?.answer_type === ANSWER_TYPE.MCQ) {
              const mcqData = data as MCQQuestionResponse;
              const mcqValue = value as number;
              return (
                <MCQTest
                  data={mcqData}
                  selected={mcqValue}
                  setSelected={setValue}
                />
              );
            } else if (data?.answer_type === ANSWER_TYPE.MMCQ) {
              let mmcqData = data as MMCQQuestionResponse;
              let mmcqValue = value as (number | null)[];

              return (
                <MMCQTest
                  data={mmcqData}
                  selected={value as (number | null)[]}
                  setSelected={setValue}
                />
              );
            }
          })()}

          <div className="TestQuestionWrapper-button-container">
            <button onClick={onClearResponse}>Clear response</button>
            {props.skippable && <button onClick={props.nextPage}>Skip</button>}
            <button
              onClick={submitAndNext}
              disabled={isNextDisabled()}
              className={isNextDisabled() ? "button-disabled" : ""}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestQuestionWrapper;
