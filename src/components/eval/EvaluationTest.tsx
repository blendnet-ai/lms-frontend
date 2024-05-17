import { Pagination } from "@mui/material";
import Header from "../Header";
import "./../../styles/EvaluationTest.css";
import { useState } from "react";
import WritingTest from "../WritingTest";
import EvalAPI from "../../apis/EvalAPI";
import { useNavigate } from "react-router-dom";

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
  pages: JSX.Element[];
  currentPage: number;
  setPage: (newPage: number) => void;
  assessmentId: number;
};

function EvaluationTest(props: EvaluationTestProps) {
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    props.setPage(value);
  };

  const navigate = useNavigate();

  const submitAssessment = () => {
    EvalAPI.closeAssessment(props.assessmentId);
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
          count={props.pages.length}
          page={props.currentPage}
          onChange={handlePageChange}
        />
      </div>
      {props.pages[props.currentPage - 1]}
      <div className="WritingTest-button">
        <button onClick={submitAssessment}>Submit</button>
      </div>
    </div>
  );
}

export default EvaluationTest;
