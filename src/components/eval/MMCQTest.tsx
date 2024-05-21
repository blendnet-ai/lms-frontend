import { useState } from "react";
import { Divider, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { MCQQuestionResponse, MMCQQuestionResponse } from "../../apis/EvalAPI";
import "./../../styles/eval/MMCQTest.css";

type MMCQTestProps = {
  data: MMCQQuestionResponse;
  selected: (number | null)[] | null;
  setSelected: (arg1: (number | null)[] | null) => void;
};

function MMCQTest(props: MMCQTestProps) {
  const handleOptionSelect = (newOption: number | null, index: number) => {
    let selected: (number | null)[] | null = props.selected;

    if (selected == null) {
      selected = new Array(props.data.questions.length).fill(null);
    } else {
      selected = [...selected];
    }
    selected[index] = newOption;
    props.setSelected(selected);
  };

  return (
    <div className="MMCQTest">
      <div>{props.data.paragraph}</div>
      {props.data.image_url &&
        props.data.image_url.map((image_url, i) => {
          return <img key={i} src={image_url} />;
        })}
      <Divider component="li" />
      {props.data.questions.map((question, i) => {
        return (
          <>
            <div className="MMCQTest-question-heading">Question</div>
            <div>{question.question}</div>
            <ToggleButtonGroup
              value={props.selected != null ? props.selected[i] : null}
              exclusive
              onChange={(_, newOption) => handleOptionSelect(newOption, i)}
            >
              <div className="MMCQTest-ToggleButtonGroup">
                {question.options.map((option, i) => (
                  <ToggleButton key={i} value={i}>
                    {option}
                  </ToggleButton>
                ))}
              </div>
            </ToggleButtonGroup>
            <Divider component="li" />
          </>
        );
      })}
    </div>
  );
}

export default MMCQTest;
