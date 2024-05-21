import { useEffect, useState } from "react";
import {
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import EvalAPI, { PersonalityQuestionResponse } from "../../apis/EvalAPI";
import "./../../styles/eval/MCQTest.css";

type PersonalityMCQProps = {
  questionId: number;
  assessmentId: number;
  nextPage: () => void;
  selectedValue: number | null;
  updateSelectedValue: (questionId: number, value: number | null) => void;
};

function MCQTest(props: PersonalityMCQProps) {
  const [data, setData] = useState<PersonalityQuestionResponse | null>(null);
  const [selected, setSelected] = useState(props.selectedValue);

  useEffect(() => {
    (async () => {
      const fetchedData = await EvalAPI.getPersonalityQuestion(
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
    setSelected(newOption);
  };

  const onClearResponse = () => {
    setSelected(null);
  };

  const submitAndNext = () => {
    if (selected === null) return;
    props.updateSelectedValue(props.questionId, selected);
    EvalAPI.submitMCQ(props.questionId, props.assessmentId, selected);
    props.nextPage();
  };

  return (
    <div className="MCQTest">
      {!data && (
        <div className="CircularProgress">
          <CircularProgress size={100} />
        </div>
      )}
      {data && (
        <div className="MCQTest-inner">
          <div>{data.question}</div>
          <ToggleButtonGroup
            value={selected}
            exclusive
            onChange={handleOptionSelect}
          >
            <div className="MCQTest-ToggleButtonGroup">
              {data.options.map((option, i) => (
                <ToggleButton key={i} value={i}>
                  {option}
                </ToggleButton>
              ))}
            </div>
          </ToggleButtonGroup>

          <div className="MCQTest-button-container">
            <button onClick={onClearResponse}>Clear response</button>
            <button onClick={props.nextPage}>Skip</button>
            <button
              onClick={submitAndNext}
              disabled={selected === null}
              className={selected === null ? "button-disabled" : ""}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MCQTest;
