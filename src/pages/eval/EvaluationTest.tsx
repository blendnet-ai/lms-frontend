import { Pagination } from "@mui/material";
import Header from "../../components/Header";
import "./../../styles/EvaluationTest.css";
import { useEffect, useState } from "react";
import EvalAPI from "../../apis/EvalAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import TestQuestionWrapper from "../../components/eval/TestQuestionWrapper";

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

type Question = {
  questionId: number;
  skippable: boolean;
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
  const [questions, setQuestions] = useState<Question[]>([]);
  const [assessmentId, setAssessmentId] = useState<number | null>(null);

  const [submittedValues, setSubmittedValues] = useState<{
    [key: number]: number | (number | null)[] | string | null;
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

    const fetchedQuestions: Question[] = [];

    data.question_list.forEach((section) => {
      const skippable = section.skippable;
      section.questions.forEach((questionId) => {
        fetchedQuestions.push({
          questionId,
          skippable,
        });
      });
    });

    setQuestions(fetchedQuestions);

    let submittedValues: {
      [key: number]: number | (number | null)[] | null | string;
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
      } else if (attempted_question.answer_text != null) {
        submittedValues = {
          ...submittedValues,
          [attempted_question.question_id]: attempted_question.answer_text,
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
    value: number | (number | null)[] | null | string
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

  const [navOpen, setNavOpen] = useState(false);

  const onNavClicked = () => {
    setNavOpen((prev) => !prev);
  };

  const onNavCellClicked = (index: number) => {
    setPage(index + 1);
    onNavClicked();
  };
  return (
    <div className="EvaluationTest">
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
      {!navOpen && (
        <div className="EvaluationTest-btn-container">
          <button onClick={onNavClicked}>Question Navigator</button>
        </div>
      )}
      {!navOpen && (
        <>
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
                    skippable={question.skippable}
                    key={i}
                    questionId={question.questionId}
                    nextPage={nextPage}
                    assessmentId={assessmentId}
                    submittedValue={
                      submittedValues.hasOwnProperty(question.questionId)
                        ? submittedValues[question.questionId]
                        : null
                    }
                    updateSubmittedValue={updateSubmittedValue}
                  />
                );
            })}
          <div className="EvaluationTest-btn-container">
            <button onClick={submitAssessment}>Submit</button>
          </div>
        </>
      )}

      {navOpen && (
        <div className="EvaluationTest-nav">
          <h3>Questions Navigator</h3>
          <div className="EvaluationTest-grid-item-demo-container">
            <div className="EvaluationTest-grid-item-demo-container-inner">
              <div className="EvaluationTest-grid-item-demo EvaluationTest-grid-item-filled"></div>
              <div className="EvaluationTest-grid-item-demo-text">Answered</div>
            </div>
            <div className="EvaluationTest-grid-item-demo-container-inner">
              <div className="EvaluationTest-grid-item-demo EvaluationTest-grid-item-unfilled"></div>
              <div className="EvaluationTest-grid-item-demo-text">
                Unanswered
              </div>
            </div>
          </div>
          <div className="EvaluationTest-grid-container">
            {questions.map((question, index) => {
              let className = "EvaluationTest-grid-item";
              if (submittedValues.hasOwnProperty(question.questionId)) {
                className += " EvaluationTest-grid-item-filled";
              } else {
                className += " EvaluationTest-grid-item-unfilled";
              }

              return (
                <div
                  onClick={() => onNavCellClicked(index)}
                  key={index}
                  className={className}
                ></div>
              );
            })}
          </div>
          <div className="EvaluationTest-btn-container">
            <button onClick={onNavClicked}>Back</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EvaluationTest;
