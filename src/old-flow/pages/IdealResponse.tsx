import {
  NotesOutlined,
  QuestionMark,
  SmartToy,
  TaskOutlined,
} from "@mui/icons-material";
import Container from "../component/Container";
import { useEffect, useState } from "react";
import {
  EvaluationAPI,
  GetReviewResponseResponse,
} from "../../apis/EvaluationAPI";
import { CircularProgress } from "@mui/material";
import "../styles/IdealResponse.css";

type Props = {
  questionId: string;
};

type TextContentProps = {
  text: string;
};

const TextContent = ({ text }: TextContentProps) => {
  return <div className="TextContent">{text}</div>;
};

const IdealResponse = ({ questionId }: Props) => {
  const [data, setData] = useState<GetReviewResponseResponse | null>(null);

  useEffect(() => {
    (async () => {
      const data = await EvaluationAPI.getReviewResponse(questionId);
      setData(data);
    })();
  }, []);

  return (
    <div className="IdealResponse">
      {data && (
        <>
          <Container
            icon={<QuestionMark />}
            content={<TextContent text={data.question_text} />}
            title="Question"
          />
          <Container
            icon={<NotesOutlined />}
            content={<TextContent text={data.user_response} />}
            title="Your Reponse"
          />
          <Container
            icon={<TaskOutlined />}
            content={<TextContent text={data.ideal_response} />}
            title="Ideal Reponse"
          />
        </>
      )}
      {!data && <CircularProgress />}
    </div>
  );
};

export default IdealResponse;
