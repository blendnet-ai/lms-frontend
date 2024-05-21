import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { MCQQuestionResponse } from "../../apis/EvalAPI";
import "./../../styles/eval/MCQTest.css";

type PersonalityMCQProps = {
  selectedValue: number | null;
  data: MCQQuestionResponse;
  selected: number | null;
  setSelected: (arg1: number | null) => void;
};

function MCQTest(props: PersonalityMCQProps) {
  const handleOptionSelect = (
    _event: React.MouseEvent<HTMLElement>,
    newOption: number | null
  ) => {
    props.setSelected(newOption);
  };

  return (
    <div className="MCQTest">
      <div>{props.data.question}</div>
      <ToggleButtonGroup
        value={props.selected}
        exclusive
        onChange={handleOptionSelect}
      >
        <div className="MCQTest-ToggleButtonGroup">
          {props.data.options.map((option, i) => (
            <ToggleButton key={i} value={i}>
              {option}
            </ToggleButton>
          ))}
        </div>
      </ToggleButtonGroup>
    </div>
  );
}

export default MCQTest;
