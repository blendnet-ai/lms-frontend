import { ChangeEvent } from "react";
import { WritingQuestionResponse } from "../../apis/EvalAPI";
import "./../../styles/eval/WritingTest.css";

type WritingTestProps = {
  data: WritingQuestionResponse;
  answer: string;
  setAnswer: (arg1: string | null) => void;
};

function WritingTest(props: WritingTestProps) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.setAnswer(event.target.value);
  };

  return (
    <div className="WritingTest">
      <div>{props.data.question}</div>
      <textarea value={props.answer} onChange={handleChange}></textarea>
    </div>
  );
}

export default WritingTest;
