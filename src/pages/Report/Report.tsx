import { Button, CircularProgress, Typography } from "@mui/material";
import "./Report.css";
import CustomCircularProgress from "../../components/CustomCircularProgress/CustomCircularProgress";
import { Summarize, SummarizeOutlined } from "@mui/icons-material";
import ScoreCard from "../../old-flow/component/ScoreCard";
import { GetEvaluationAPIResponse } from "../../apis/EvaluationAPI";
import Container from "../../old-flow/component/Container";
import { useNavigate } from "react-router-dom";

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

type Props = {
  data: GetEvaluationAPIResponse | null;
  questionId: string;
};

function Report({ data, questionId }: Props) {
  const navigate = useNavigate();

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
            title="Summary"
            icon={<SummarizeOutlined />}
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
                    data.evaluation_response.Vocab.score != null
                      ? vocabFilled[
                          data.evaluation_response.Vocab.score.substring(0, 2)
                        ]
                      : null
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
                  filledValue={
                    data.evaluation_response.Coherence.score != null
                      ? data.evaluation_response.Coherence.score * 10
                      : null
                  }
                  innerValue={`${data.evaluation_response.Coherence.score}/10`}
                  innerColor={"#a7fff4"}
                />
                <ScoreCard
                  title={"Emotion"}
                  filledValue={
                    data.evaluation_response.Emotion.score != null
                      ? data.evaluation_response.Emotion.score * 10
                      : null
                  }
                  innerValue={`${data.evaluation_response.Emotion.score}/10`}
                  innerColor={"#e4ccff"}
                />
              </div>
            }
          />
          {data.evaluation_response.Ideal.isComputed && (
            <Button
              sx={{ borderRadius: 10, textTransform: "none" }}
              variant="contained"
              onClick={() =>
                navigate(`/report/ideal-reponse?questionId=${questionId}`)
              }
            >
              Review Response
            </Button>
          )}
        </>
      )}
      {!data && <CircularProgress />}
    </div>
  );
}

export default Report;
