import { Pagination } from "@mui/material";
import Header from "../Header";
import "./../../styles/EvaluationTest.css";
import { useEffect, useState } from "react";
import WritingTest from "../WritingTest";
import EvalAPI from "../../apis/EvalAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import MCQTest from "./MCQTest";

type TestHeaderContent = {
  title: string;
  des1: string;
  des2: string;
};

function TestHeaderContent(props: TestHeaderContent) {
  return (
    <div className="CommunicationTestHeaderContent">
      <div className="CommunicationTestHeaderContent-heading">
        {props.title}
      </div>
      <div className="CommunicationTestHeaderContent-des">
        <div>{props.des1}</div>
        <div>{props.des2}</div>
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

  const [selectedValues, setSelectedValues] = useState<{
    [key: number]: number | null;
  }>({});

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
    fetchQuestions();
  }, [assessmentId]);

  const fetchQuestions = async () => {
    if (!assessmentId) return;
    const data = await EvalAPI.getData(assessmentId);
    setQuestions(data.question_list);
  };

  const updateSelectedValue = (questionId: number, value: number | null) => {
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [questionId]: value,
    }));
  };

  useEffect(() => {
    console.log(selectedValues);
    console.log(selectedValues[339]);
  }, [selectedValues]);

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
          if (i == currentPage)
            return (
              <MCQTest
                key={i}
                questionId={question}
                nextPage={nextPage}
                assessmentId={assessmentId}
                selectedValue={
                  selectedValues.hasOwnProperty(question)
                    ? selectedValues[question]
                    : null
                }
                updateSelectedValue={updateSelectedValue}
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
