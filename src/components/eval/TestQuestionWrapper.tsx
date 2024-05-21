import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import EvalAPI, { MCQQuestionResponse } from "../../apis/EvalAPI";
import "./../../styles/eval/TestQuestionWrapper.css";
import MCQTest from "./MCQTest";

type PersonalityMCQProps = {
  questionId: number;
  assessmentId: number;
  nextPage: () => void;
  submittedValue: number | null;
  updateSubmittedValue: (questionId: number, value: number | null) => void;
};

function TestQuestionWrapper(props: PersonalityMCQProps) {
  const [data, setData] = useState<MCQQuestionResponse | null>(null);
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

  const handleOptionSelect = (
    _event: React.MouseEvent<HTMLElement>,
    newOption: number | null
  ) => {
    setValue(newOption);
  };

  const onClearResponse = () => {
    setValue(null);
  };

  const submitAndNext = () => {
    if (value === null) return;
    props.updateSubmittedValue(props.questionId, value);
    EvalAPI.submitMCQ(props.questionId, props.assessmentId, value);
    props.nextPage();
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
          <MCQTest
            selectedValue={value}
            data={data}
            selected={value}
            setSelected={setValue}
          />

          <div className="TestQuestionWrapper-button-container">
            <button onClick={onClearResponse}>Clear response</button>
            <button onClick={props.nextPage}>Skip</button>
            <button
              onClick={submitAndNext}
              disabled={value === null}
              className={value === null ? "button-disabled" : ""}
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
