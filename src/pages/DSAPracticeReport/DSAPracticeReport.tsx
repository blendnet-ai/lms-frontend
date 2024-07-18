import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DSAPracticeAPI, { GetReport } from "../../apis/DSAPracticeAPI";
import { Box, CircularProgress } from "@mui/material";

export default function DSAPracticeReport() {
  const [searchParams, _] = useSearchParams();
  const [assessmentId, setAssessmentId] = useState<number | null>(null);

  const [report, setReport] = useState<GetReport | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const fetchReport = async () => {
    if (assessmentId) {
      try {
        const report = await DSAPracticeAPI.getReport(assessmentId);
        setReport(report);
      } catch (err) {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchReport();
    }, 5000);

    if (report && report.top) {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [report, assessmentId]);

  useEffect(() => {
    fetchReport();
  }, [assessmentId]);

  useEffect(() => {
    (async () => {
      const assessmentId = searchParams.get("assessment_id");
      console.log(assessmentId);
      if (assessmentId) setAssessmentId(parseInt(assessmentId));
    })();
  }, []);

  if (report)
    return (
      <Box
        sx={{
          maxHeight: "50vh",
          overflow: "auto",
          padding: "16px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}
      >
        <pre>{JSON.stringify(report, null, 2)}</pre>
      </Box>
    );
  else return <CircularProgress />;
}
