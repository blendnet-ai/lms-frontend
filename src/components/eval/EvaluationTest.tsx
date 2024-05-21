import { Pagination } from "@mui/material";
import Header from "../Header";
import "./../../styles/EvaluationTest.css";
import { useEffect, useState } from "react";
import EvalAPI from "../../apis/EvalAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import TestQuestionWrapper from "./TestQuestionWrapper";

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

type TestHeaderContent = {
  title: string;
  des1: string;
  des2: string;
  timeLeft: number;
};

function TestHeaderContent(props: TestHeaderContent) {
  return (
    <div className="TestHeaderContent">
      <div>
        <div className="TestHeaderContent-heading">{props.title}</div>
        <div className="TestHeaderContent-des">
          <div>{props.des1}</div>
          <div>{props.des2}</div>
        </div>
      </div>
      <div className="TestHeaderContent-clock">
        {formatTime(props.timeLeft)}
      </div>
    </div>
  );
}

type EvaluationTestProps = {
  title: string;
  des1: string;
  des2: string;
};

function EvaluationTest(props: EvaluationTestProps) {
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  const [currentPage, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [questions, setQuestions] = useState<number[]>([]);
  const [assessmentId, setAssessmentId] = useState<number | null>(null);

  const [submittedValues, setSubmittedValues] = useState<{
    [key: number]: number | (number | null)[] | null;
  }>({});

  const [timeLeft, setTimeLeft] = useState<number>(0);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const assessment_id = searchParams.get("assessment_id");
    if (assessment_id) {
      setAssessmentId(parseInt(assessment_id));
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [assessmentId]);

  const fetchData = async () => {
    if (!assessmentId) return;
    const data = await EvalAPI.getData(assessmentId);
    setQuestions(data.question_list);

    let submittedValues: {
      [key: number]: number | (number | null)[] | null;
    } = [];

    data.attempted_questions.map((attempted_question) => {
      if (attempted_question.mcq_answer != null) {
        submittedValues = {
          ...submittedValues,
          [attempted_question.question_id]: attempted_question.mcq_answer,
        };
      } else if (attempted_question.multiple_mcq_answer != null) {
        submittedValues = {
          ...submittedValues,
          [attempted_question.question_id]:
            attempted_question.multiple_mcq_answer,
        };
      }
    });
    setSubmittedValues(submittedValues);
    setTimeLeft(data.time_left);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const updateSubmittedValue = (
    questionId: number,
    value: number | (number | null)[] | null
  ) => {
    setSubmittedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [questionId]: value,
    }));
  };

  const navigate = useNavigate();

  const submitAssessment = () => {
    if (!assessmentId) return;
    EvalAPI.closeAssessment(assessmentId);
    navigate("/evaluation");
  };

  return (
    <div className="WritingTest">
      <Header
        content={
          <TestHeaderContent
            title={props.title}
            des1={props.des1}
            des2={props.des2}
            timeLeft={timeLeft}
          />
        }
      />
      <div className="pagination-container">
        <Pagination
          count={questions.length}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
      {assessmentId &&
        questions.map((question, i) => {
          if (i == currentPage - 1)
            return (
              <TestQuestionWrapper
                key={i}
                questionId={question}
                nextPage={nextPage}
                assessmentId={assessmentId}
                submittedValue={
                  submittedValues.hasOwnProperty(question)
                    ? submittedValues[question]
                    : null
                }
                updateSubmittedValue={updateSubmittedValue}
              />
            );
        })}
      <div className="WritingTest-button">
        <button onClick={submitAssessment}>Submit</button>
      </div>
    </div>
  );
}

export default EvaluationTest;
