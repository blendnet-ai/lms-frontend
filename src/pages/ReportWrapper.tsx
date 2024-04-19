import { Box, Button, CircularProgress, Typography } from "@mui/material";
import "./../styles/ReportWrapper.css";
import CustomCircularProgress from "../components/CustomCircularProgress";
import { SmartToy, Summarize } from "@mui/icons-material";
import ScoreCard from "../components/ScoreCard";
import { EvaluationAPI, GetEvaluationAPIResponse } from "../apis/EvaluationAPI";
import { useEffect, useRef, useState } from "react";
import Container from "../components/Container";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "./Profile";
import Report from "./Report";
import IdealResponse from "./IdealResponse";

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

function ReportWrapper() {
  const [data, _setData] = useState<GetEvaluationAPIResponse | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const [questionId, setQuestioId] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const dataRef = useRef(data);
  const setData = (value: GetEvaluationAPIResponse | null) => {
    dataRef.current = value;
    _setData(value);
  };

  const fetchData = async () => {
    const questionIdParam = searchParams.get("questionId");
    if (questionIdParam) {
      setQuestioId(questionIdParam);
      const evaluation = await EvaluationAPI.getEvaluation(questionIdParam);
      setData(evaluation);
    } else {
    }
  };

  useEffect(() => {
    if (data && data.audio_url && !audioURL) setAudioURL(data.audio_url);
  }, [data]);

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

  const navigate = useNavigate();

  if (!questionId) {
    return <div>Question id not provided</div>;
  }
  return (
    <>
      {audioURL && (
        <div className="audio-container">
          <audio className="audio-player" controls src={audioURL} />
        </div>
      )}
      <div className="ReportWrapper">
        {data && (
          <>
            <Routes>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Report data={data} questionId={questionId} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/ideal-reponse"
                element={
                  <ProtectedRoute>
                    <IdealResponse questionId={questionId} />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </>
        )}
        {!data && <CircularProgress />}
      </div>
    </>
  );
}

export default ReportWrapper;
