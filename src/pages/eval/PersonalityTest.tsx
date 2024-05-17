import { useEffect, useState } from "react";
import EvaluationTest from "../../components/eval/EvaluationTest";
import PersonalityMCQ from "../../components/eval/PersonalityMCQ";
import WritingTest from "../../components/WritingTest";
import { useSearchParams } from "react-router-dom";
import EvalAPI from "../../apis/EvalAPI";

export default function PersonalityTest() {
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
    console.log("here");
    console.log(value);
    setSelectedValues((prevSelectedValues) => ({
      ...prevSelectedValues,
      [questionId]: value,
    }));
  };

  useEffect(() => {
    console.log(selectedValues);
    console.log(selectedValues[339]);
  }, [selectedValues]);

  return (
    <>
      {assessmentId && (
        <EvaluationTest
          currentPage={currentPage}
          setPage={setPage}
          title="Psychometric Assessment"
          des2=""
          des1=""
          assessmentId={assessmentId}
          pages={
            assessmentId
              ? questions.map((question, i) => {
                  return (
                    <PersonalityMCQ
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
                })
              : []
          }
        />
      )}
      {!assessmentId && <div>Assessment id is invalid or not provided</div>}
    </>
  );
}
