import { Box, CircularProgress, Typography } from "@mui/material";
import "./../styles/Report.css";
import CustomCircularProgress from "../components/CustomCircularProgress";
import { SmartToy, Summarize } from "@mui/icons-material";
import ScoreCard from "../components/ScoreCard";
import { EvaluationAPI, GetEvaluationAPIResponse } from "../apis/EvaluationAPI";
import { useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import { useSearchParams } from "react-router-dom";

interface VocabFilled {
  [key: string]: number;
}

const vocabFilled: VocabFilled = {
  A1: 100,
  A2: 80,
  B1: 60,
  B2: 40,
  C1: 20,
  C2: 0,
};

enum Status {
  COMPLETE = "Complete",
  PARTIAL = "Patial",
  ERROR = "Error",
}

function Report() {
  const [data, _setData] = useState<GetEvaluationAPIResponse | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const dataRef = useRef(data);
  const setData = (value: GetEvaluationAPIResponse | null) => {
    dataRef.current = value;
    _setData(value);
  };

  const fetchData = async () => {
    const questionIdParam = searchParams.get("questionId");
    if (questionIdParam) {
      const evaluation = await EvaluationAPI.getEvaluation(questionIdParam);
      setData(evaluation);
    } else {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = 5000; // 5 seconds in milliseconds

    timerRef.current = setInterval(() => {
      if (
        dataRef.current &&
        (dataRef.current.status == Status.COMPLETE ||
          dataRef.current.status == Status.ERROR)
      ) {
        if (timerRef.current) clearInterval(timerRef.current);
        console.log("Status is complete/error. Stopping the interval.");
      } else {
        fetchData();
      }
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="Report">
      {data && (
        <>
          <div className="header">
            <div className="header-left">
              {data.overall_score && (
                <CustomCircularProgress
                  filledValue={data.overall_score * 10}
                  innerValue={data.overall_score}
                  innerColor={"#1876d2"}
                />
              )}
              {!data.overall_score && <CircularProgress size={100} />}
              Overall score
            </div>
            <div className="header-right">
              <div id="overall-perf-heading">Overall Performance -</div>
              {}
              <div id="overall-perf-text">
                {data.overall_performance ? (
                  data.overall_performance
                ) : (
                  <CircularProgress size={100} />
                )}
              </div>
            </div>
          </div>
          <div className="summary">
            <div id="summary-heading">Summary </div>
            <div>
              {data.summary ? data.summary : <CircularProgress size={100} />}
            </div>
          </div>

          <Container
            icon={<Summarize />}
            content={
              <div className="scorecards-container">
                <ScoreCard
                  title={"Fluency"}
                  filledValue={data.evaluation_response.Fluency.score}
                  innerValue={`${data.evaluation_response.Fluency.score}%`}
                  innerColor={"#00d8d7"}
                />
                <ScoreCard
                  title={"Vocab"}
                  filledValue={
                    vocabFilled[
                      data.evaluation_response.Vocab.score.substring(0, 2)
                    ]
                  }
                  innerValue={data.evaluation_response.Vocab.score}
                  innerColor={"#bae6ff"}
                />
                <ScoreCard
                  title={"Grammar"}
                  filledValue={data.evaluation_response.Grammar.score}
                  innerValue={`${data.evaluation_response.Grammar.score}%`}
                  innerColor={"#6fdd8d"}
                />
                <ScoreCard
                  title={"Pronunciation"}
                  filledValue={data.evaluation_response.Pronunciation.score}
                  innerValue={`${data.evaluation_response.Pronunciation.score}%`}
                  innerColor={"#ffb83f"}
                />
                <ScoreCard
                  title={"Coherence"}
                  filledValue={data.evaluation_response.Coherence.score * 10}
                  innerValue={`${data.evaluation_response.Coherence.score}/10`}
                  innerColor={"#a7fff4"}
                />
                <ScoreCard
                  title={"Emotion"}
                  filledValue={data.evaluation_response.Emotion.score * 10}
                  innerValue={`${data.evaluation_response.Emotion.score}/10`}
                  innerColor={"#e4ccff"}
                />
              </div>
            }
          />
        </>
      )}
      {!data && <CircularProgress />}
    </div>
  );
}

export default Report;
