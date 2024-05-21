import { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { MCQQuestionResponse } from "../../apis/EvalAPI";
import "./../../styles/eval/MCQTest.css";

type PersonalityMCQProps = {
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
      {props.data.image_url &&
        props.data.image_url.map((image_url) => {
          return <img src={image_url} />;
        })}
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
