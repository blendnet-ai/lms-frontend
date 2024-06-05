import { Pagination } from "@mui/material";
import Header from "../../components/Header/Header";
import "./EvaluationTest.css";
import { useEffect, useState } from "react";
import EvalAPI from "../../apis/EvalAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import TestQuestionWrapper from "../../components/TestQuestionWrapper/TestQuestionWrapper";
import EvalTestConfim from "../../components/EvalTestConfirm/EvalTestConfim";
import { CalculationsUtil } from "../../utils/calculations";
import { parseISO } from "date-fns";

enum Screen {
  TEST = 0,
  NAVIGATOR = 1,
}

type TestHeaderContent = {
  title: string;
  des1: string;
  des2: string;
  timeLeft: string;
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
      <div className="TestHeaderContent-clock">{props.timeLeft}</div>
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
  const [sectionsData, setSectionsData] = useState<
    { name: string; number: number }[] | null
  >(null);
  const [assessmentId, setAssessmentId] = useState<number | null>(null);

  const [submittedValues, setSubmittedValues] = useState<{
    [key: number]: number | (number | null)[] | string | null;
  }>({});

  const nextPage = () => {
    setPage((prevPage) => {
      console.log(prevPage == questions.length); // prevPage is in 1-based indexing
      if (prevPage == questions.length) {
        console.log("yesss");
        setSubmitTestConfimDialogOpen(true);
        return prevPage;
      }
      return prevPage + 1;
    });
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

    const sectionsData: { name: string; number: number }[] = [];

    data.question_list.forEach((section, i) => {
      const skippable = section.skippable;
      section.questions.forEach((questionId) => {
        sectionsData.push({ name: section.section, number: i + 1 });
        fetchedQuestions.push({
          questionId,
          skippable,
        });
      });
    });

    const startTime = parseISO(data.start_time).getTime();
    setStart(startTime);

    setTestDuration(parseInt(data.test_duration));
    setQuestions(fetchedQuestions);
    if (data.question_list.length > 1) setSectionsData(sectionsData);

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
      } else if (attempted_question.answer_audio_url != null) {
        submittedValues = {
          ...submittedValues,
          [attempted_question.question_id]: attempted_question.answer_audio_url,
        };
      }
    });
    setSubmittedValues(submittedValues);
  };

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
    navigate("/eval-submitted");
  };

  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.TEST);

  const onNavClicked = () => {
    setCurrentScreen(Screen.NAVIGATOR);
  };

  const handleExitTestClicked = () => {
    setExitTestConfimDialogOpen(true);
  };

  const handleSubmitTestClicked = () => {
    setSubmitTestConfimDialogOpen(true);
  };

  const handleNavigatorBackClicked = () => {
    setCurrentScreen(Screen.TEST);
  };

  const onNavCellClicked = (index: number) => {
    setPage(index + 1);
    setCurrentScreen(Screen.TEST);
  };

  const handleExitConfirm = () => {
    if (!assessmentId) return;
    EvalAPI.exitAssessment(assessmentId);
    navigate("/evaluation");
  };

  const handleSubmitConfirm = () => {
    submitAssessment();
  };

  const handleExitConfimDialogBackClicked = () => {
    setExitTestConfimDialogOpen(false);
  };

  const handleSubmitConfimDialogBackClicked = () => {
    setSubmitTestConfimDialogOpen(false);
  };
  const [isExitTestConfimDialogOpen, setExitTestConfimDialogOpen] =
    useState(false);
  const [isSubmitTestConfimDialogOpen, setSubmitTestConfimDialogOpen] =
    useState(false);

  const [unskippableAttempted, setUnskippableAttempted] = useState(false);

  useEffect(() => {
    if (isSubmitTestConfimDialogOpen) {
      let unskippableAttempted = true;

      for (let i = 0; i < questions.length; i++) {
        let question = questions[i];
        if (!question.skippable) {
          if (!submittedValues.hasOwnProperty(question.questionId)) {
            unskippableAttempted = false;
            break;
          }
        }
      }
      setUnskippableAttempted(unskippableAttempted);
    }
  }, [isSubmitTestConfimDialogOpen]);

  const [start, setStart] = useState<number | null>(null);
  const [testDuration, setTestDuration] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const intervalID = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(intervalID);
  }, []);

  const getRemainingTime = () => {
    if (!start || !testDuration) return "";
    const endTime = start + testDuration * 1000;

    // Calculate the remaining time in seconds
    const remainingTimeInSeconds = Math.max(
      0,
      Math.floor((endTime - now) / 1000)
    );

    if (remainingTimeInSeconds <= 0) {
      submitAssessment();
    }

    // Format the remaining time using the formatTime function
    const formattedTime = CalculationsUtil.formatTime(remainingTimeInSeconds);
    return formattedTime;
  };

  return (
    <div className="EvaluationTest">
      <Header
        content={
          <TestHeaderContent
            title={props.title}
            des1={
              sectionsData
                ? `Section ${sectionsData[currentPage - 1].number}: ${
                    sectionsData[currentPage - 1].name
                  }`
                : ""
            }
            des2={props.des2}
            timeLeft={getRemainingTime()}
          />
        }
      />
      <EvalTestConfim
        open={isExitTestConfimDialogOpen}
        heading="Are you sure you want to exit the test?"
        des="Once you exit, you will not be able to resume and this attempt will be lost."
        btn1Text="No, back to test"
        btn2Text="Yes, Exit Test"
        onBtn1Clicked={handleExitConfimDialogBackClicked}
        onBtn2Clicked={handleExitConfirm}
      />
      {unskippableAttempted ? (
        <EvalTestConfim
          open={isSubmitTestConfimDialogOpen}
          heading="Are you sure you want to submit the test?"
          des="Once you submit, your answers will be sent for evaluation and no modifications will be allowed."
          btn1Text="No, back to test"
          btn2Text="Yes, Submit Test"
          onBtn1Clicked={handleSubmitConfimDialogBackClicked}
          onBtn2Clicked={handleSubmitConfirm}
        />
      ) : (
        <EvalTestConfim
          open={isSubmitTestConfimDialogOpen}
          heading="Please answers all the questions before submitting."
          btn1Text="Back to test"
          onBtn1Clicked={handleSubmitConfimDialogBackClicked}
        />
      )}

      {currentScreen == Screen.TEST && (
        <div className="btn-container">
          <button onClick={onNavClicked}>Question Navigator</button>
          <button onClick={handleExitTestClicked}>Exit test</button>
        </div>
      )}
      {currentScreen == Screen.TEST && (
        <>
          <div className="pagination-container">
            <Pagination
              count={questions.length}
              page={currentPage}
              onChange={handlePageChange}
              sx={{
                "& .MuiPaginationItem-page.Mui-selected": {
                  backgroundColor: "#4B9097",
                  color: "white",
                },
              }}
            />
          </div>
          {assessmentId &&
            questions.map((question, i, arr) => {
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
                    lastQuestion={i == arr.length - 1}
                    updateSubmittedValue={updateSubmittedValue}
                  />
                );
            })}
        </>
      )}

      {currentScreen == Screen.NAVIGATOR && (
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
                >
                  {index + 1}
                </div>
              );
            })}
          </div>
          <div className="btn-container">
            <button
              className="button-green"
              onClick={handleNavigatorBackClicked}
            >
              Back
            </button>
            <button className="button-green" onClick={handleSubmitTestClicked}>
              Submit Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EvaluationTest;
