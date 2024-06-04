import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import "./TestWelcome.css";
import EvalAPI from "../../apis/EvalAPI";
import { useNavigate } from "react-router-dom";
import HeaderContentWithBack from "../../components/HeaderContentWithBack/HeaderContentWithBack";
import { images } from "../../assets";
import useUserData from "../../hooks/useUserData";
import formatName from "../../utils/formatName";

type TestWelcomeProps = {
  heading: string;
  headingInner: string;
  content: string;
  illustration: string;
  testRoutePath: string;
  assessment_generation_id: number;
};

enum Layouts {
  WELCOME = 0,
  BUFFER = 1,
}

export default function TestWelcome(props: TestWelcomeProps) {
  const { name } = useUserData();

  const [currentLayout, setCurrentLayout] = useState(Layouts.WELCOME);

  const [timeLeft, setTimeLeft] = useState(10);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [assessmentId, setAssessmentId] = useState<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) handleStartTestClick();
  }, [timeLeft]);

  const navigate = useNavigate();

  const handleTakeATestClick = async () => {
    setCurrentLayout(Layouts.BUFFER);

    await startAttempt();

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);
  };

  const startAttempt = async () => {
    const response = await EvalAPI.startAssessment(
      props.assessment_generation_id
    );

    setAssessmentId(response.assessment_id);
  };

  const handleStartTestClick = () => {
    if (!assessmentId) return;
    navigate(`/${props.testRoutePath}?assessment_id=${assessmentId}`);
  };
  const createMarkup = (text: string) => {
    return { __html: text };
  };

  return (
    <div className="CommunicationTestWelcome">
      {currentLayout === Layouts.WELCOME && (
        <Header
          content={
            <HeaderContentWithBack
              heading={`Hi ${
                name && formatName(name, true, false, 0, 0, 0, 1)
              },`}
            />
          }
        />
      )}

      {currentLayout === Layouts.BUFFER && (
        <Header
          content={
            <HeaderContentWithBack heading={`Hi ${name},`} hideBack={true} />
          }
        />
      )}

      <div className="comm-test-wel-content">
        {currentLayout === Layouts.WELCOME && (
          <>
            <img
              className="comm-test-wel-illustration"
              src={props.illustration}
              alt=""
            />
            <div className="comm-test-wel-content-heading">
              {props.headingInner}
            </div>
            <div className="comm-test-wel-content-des">
              {/* <div className="comm-test-wel-content-des-inner">
                {props.content}
              </div> */}
              <div
                className="comm-test-wel-content-des-inner"
                dangerouslySetInnerHTML={createMarkup(props.content)}
              ></div>
            </div>
            <button onClick={handleTakeATestClick}>Take a test</button>
          </>
        )}
        {currentLayout === Layouts.BUFFER && (
          <>
            <div className="CommunicationTestWelcome-timer-container">
              <img
                className="CommunicationTestWelcome-hourglass"
                src={images.hourglass}
                alt=""
              />
              <div className="CommunicationTestWelcome-time">
                {timeLeft} sec
              </div>
            </div>
            <div>Your test will start soon</div>
            <div className="CommunicationTestWelcome-atb">All the best</div>
            <button onClick={handleStartTestClick}>Start Test</button>
          </>
        )}
      </div>
    </div>
  );
}
