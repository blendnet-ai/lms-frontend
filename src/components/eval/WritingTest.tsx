import { ChangeEvent, useEffect } from "react";
import { WritingQuestionResponse } from "../../apis/EvalAPI";
import "./../../styles/eval/WritingTest.css";
import { CalculationsUtil } from "./../../utils/calculations";
import appConfig from "../../configs/app";

type WritingTestProps = {
  data: WritingQuestionResponse;
  answer: string;
  setAnswer: (arg1: string | null) => void;
  maxWords: number;
  setSubmitDisabled: (disabled: boolean) => void;
};

function WritingTest(props: WritingTestProps) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    props.setAnswer(event.target.value);
  };

  const getWordCountCssClass = () => {
    let className = "WritingTest-word-count";
    if (CalculationsUtil.countWords(props.answer) > props.maxWords) {
      className += " WritingTest-word-count-invalid";
    }
    return className;
  };

  useEffect(() => {
    const shouldSubmitBeDisabled = () => {
      const writingValue = props.answer;
      return (
        writingValue === null ||
        writingValue.trim() === "" ||
        CalculationsUtil.countWords(writingValue) > appConfig.MAX_WRITING_WORDS
      );
    };
    props.setSubmitDisabled(shouldSubmitBeDisabled());
  }, [props.answer]);

  return (
    <div className="WritingTest">
      <div>{props.data.question}</div>
      <textarea value={props.answer} onChange={handleChange}></textarea>

      <div className={getWordCountCssClass()}>{`${CalculationsUtil.countWords(
        props.answer
      )}/${props.maxWords} words`}</div>
    </div>
  );
}

export default WritingTest;
