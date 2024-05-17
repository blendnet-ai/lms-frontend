import { useEffect, useState } from "react";
import Header from "../components/Header";
import "./../styles/TestWelcome.css";
import { HomeHeaderContent } from "./Home";
import { auth } from "../configs/firebase";
import EvalAPI, { Assessment } from "../apis/EvalAPI";
import { useNavigate } from "react-router-dom";

export function CommunicationTestWelcome() {
  return (
    <TestWelcome
      heading="Welcome to communication test"
      headingInner="Welcome to your communication test"
      content="This test will have total 4 sections. Speaking, reading writing,
  reading, listening. each section will have 20 questions. 30 mins for
  each section."
      illustration="communication-skills.svg"
    />
  );
}

export function PersonalityTestWelcome() {
  return (
    <TestWelcome
      heading="Welcome to psychometric test"
      headingInner="Welcome to your psychometric test"
      content="Sample description"
      illustration="psychometric-assessment.svg"
    />
  );
}

type TestWelcomeProps = {
  heading: string;
  headingInner: string;
  content: string;
  illustration: string;
};

function TestWelcome(props: TestWelcomeProps) {
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
