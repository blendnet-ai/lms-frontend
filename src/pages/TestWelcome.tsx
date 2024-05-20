import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./../styles/TestWelcome.css";
import { HomeHeaderContent } from "./Home";
import { auth } from "../configs/firebase";
import EvalAPI, { Assessment } from "../apis/EvalAPI";
import { useNavigate } from "react-router-dom";

type TestWelcomeProps = {
  heading: string;
  headingInner: string;
  content: string;
  illustration: string;
};

export default function TestWelcome(props: TestWelcomeProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.displayName) setName(user?.displayName);
    });
  }, []);

  const navigate = useNavigate();

  const startAttempt = async () => {
    const response = await EvalAPI.startAssessment(Assessment.PERSONALITY);
    navigate(`/personality-test?assessment_id=${response.assessment_id}`);
  };

  return (
    <div className="CommunicationTestWelcome">
      <Header
        content={
          <HomeHeaderContent
            heading={`Hi ${name},`}
            content={props.heading}
            profile={name.at(0)}
          />
        }
      />
      <div className="comm-test-wel-content">
        <img
          className="comm-test-wel-illustration"
          src={`/illustrations/${props.illustration}`}
          alt=""
        />
        <div className="comm-test-wel-content-heading">
          {props.headingInner}
        </div>
        <div className="comm-test-wel-content-des">
          <div className="comm-test-wel-content-des-inner">{props.content}</div>
        </div>
        <button onClick={startAttempt}>Take a test</button>
      </div>
    </div>
  );
}
