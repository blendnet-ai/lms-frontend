/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Alert, Box, CircularProgress, Snackbar } from "@mui/material";
import EvalAPI, {
  MCQQuestionResponse,
  MMCQQuestionResponse,
  SpeakingQuestionResponse,
  WritingQuestionResponse,
} from "../../apis/EvalAPI";
import "./TestQuestionWrapper.css";
import MCQTest from "../MCQTest/MCQTest";
import MMCQTest from "../MMCQTest/MMCQTest";
import WritingTest from "../WritingTest/WritingTest";
import { CalculationsUtil } from "../../utils/calculations";
import appConfig from "../../configs/app";
import SpeakingTest from "../SpeakingTest/SpeakingTest";
import { upload } from "@testing-library/user-event/dist/upload";
import env from "react-dotenv";
import { NextPlan } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DSATest } from "../DSATest/DSATest";

type PersonalityMCQProps = {
  questionId: number;
  assessmentId: number;
  nextPage: () => void;
  submittedValue: number | (number | null)[] | string | null;
  updateSubmittedValue: (
    questionId: number,
    value: number | (number | null)[] | null | string
  ) => void;
  skippable: boolean;
  lastQuestion: boolean;
};

enum ANSWER_TYPE {
  MCQ = 0,
  MMCQ = 1,
  WRITING = 2,
  SPEAKING = 3,
  CODING = 4,
}

function TestQuestionWrapper(props: PersonalityMCQProps) {
  const navigate = useNavigate();
  const [data, setData] = useState<
    | MCQQuestionResponse
    | MMCQQuestionResponse
    | WritingQuestionResponse
    | SpeakingQuestionResponse
    | null
  >(null);
  const [value, setValue] = useState(props.submittedValue);

  const [isSubmitDisabled, setSubmitDisabled] = useState(false);

  const [retryAttempts, setRetryAttempts] = useState(0);

  const [isRetryAlertOpen, setRetryAlertOpen] = useState(false);
  const [retryAlertText, setRetryAlertText] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const fetchedData = await EvalAPI.getQuestion(
          props.questionId,
          props.assessmentId
        );
        setData(fetchedData);
      } catch (error) {
        // if test is abandoned or completed then redirect to evaluation page
        if ((error as any).error) {
          console.log((error as any).error);
          navigate("/evaluation");
        }
      }
    })();
  }, [props.questionId, props.assessmentId, navigate]);

  const onClearResponse = () => {
    setValue(null);
  };

  async function uploadAudioFile(
    recordedUrl: string,
    uploadUrl: string
  ): Promise<boolean> {
    if (!recordedUrl) return false;
    console.log(recordedUrl);
    console.log(uploadUrl);

    const resp = await fetch(recordedUrl);
    const file = await resp.blob();

    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": "audio/mp4",
      },
      body: file,
    });

    if (response && response !== undefined && response.ok) {
      console.log(response);
      console.log("Audio file uploaded successfully!");
      return true;
    } else {
      console.error(
        "Failed to upload audio file:",
        response.status,
        response.statusText
      );
      return false;
    }
  }

  const handleNextClick = () => {
    if (isSubmitDisabled) {
      props.nextPage();
    } else {
      submitAndNext();
    }
  };

  const submitAndNext = async () => {
    if (value === null) return;
    props.updateSubmittedValue(props.questionId, value);
    console.log("anstyoe");
    console.log(data?.answer_type);

    try {
      if (data?.answer_type === ANSWER_TYPE.MCQ) {
        const mcqValue = value as number;
        await EvalAPI.submitMCQ(props.questionId, props.assessmentId, mcqValue);
      }
      if (data?.answer_type === ANSWER_TYPE.MMCQ) {
        const mmcqValue = value as (number | null)[];
        await EvalAPI.submitMMCQ(
          props.questionId,
          props.assessmentId,
          mmcqValue
        );
      }
      if (data?.answer_type === ANSWER_TYPE.WRITING) {
        const writingValue = value as string;
        await EvalAPI.submitWriting(
          props.questionId,
          props.assessmentId,
          writingValue
        );
      }
      if (data?.answer_type === ANSWER_TYPE.SPEAKING) {
        const speakingData = data as SpeakingQuestionResponse;
        const speakingValue = value as string;
        const audioFileUploaded = await uploadAudioFile(
          speakingValue,
          speakingData.answer_audio_url
        );
        if (audioFileUploaded)
          await EvalAPI.submitSpeaking(props.questionId, props.assessmentId);
        else throw new Error("Audio file not uploaded");
      }
      props.nextPage();
    } catch (error) {
      setRetryAttempts((prev) => prev + 1);
      if (retryAttempts < appConfig.RETRY_ATTEMPTS) {
        setRetryAlertOpen(true);
        setRetryAlertText(`Answer could not be submitted, please retry.`);
      } else {
        setRetryAlertOpen(true);
        setRetryAlertText(
          `Answer could not be submitted, please check your internet.`
        );
      }
    }
  };

  const handleRetryAlertClose = () => {
    setRetryAlertOpen(false);
  };

  return (
    <div className="TestQuestionWrapper">
      {!data && (
        <div className="TestQuestionWrapper-CircularProgress">
          <CircularProgress size={100} />
        </div>
      )}

      {env.ENV !== "prod" && (
        <div className="TestQuestionWrapper-questionId">{`Question id: ${props.questionId}`}</div>
      )}
      {data && (
        <div className="TestQuestionWrapper-inner">
          <Box sx={{ width: 500 }}>
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={isRetryAlertOpen}
              style={{ color: "white" }}
              color="white"
            >
              <Alert
                onClose={handleRetryAlertClose}
                severity="error"
                variant="filled"
                sx={{ width: "100%" }}
              >
                {retryAlertText}
              </Alert>
            </Snackbar>
          </Box>
          {(() => {
            if (data?.answer_type === ANSWER_TYPE.MCQ) {
              const mcqData = data as MCQQuestionResponse;
              const mcqValue = value as number;
              return (
                <MCQTest
                  setSubmitDisabled={setSubmitDisabled}
                  data={mcqData}
                  selected={mcqValue}
                  setSelected={setValue}
                />
              );
            } else if (data?.answer_type === ANSWER_TYPE.MMCQ) {
              let mmcqData = data as MMCQQuestionResponse;
              let mmcqValue = value as (number | null)[];

              return (
                <MMCQTest
                  setSubmitDisabled={setSubmitDisabled}
                  data={mmcqData}
                  selected={mmcqValue}
                  setSelected={setValue}
                />
              );
            } else if (data?.answer_type === ANSWER_TYPE.WRITING) {
              let writingData = data as WritingQuestionResponse;
              let writingValue = value as string | null;

              return (
                <WritingTest
                  setSubmitDisabled={setSubmitDisabled}
                  data={writingData}
                  maxWords={appConfig.MAX_WRITING_WORDS}
                  answer={writingValue != null ? writingValue : ""}
                  setAnswer={setValue}
                />
              );
            } else if (data?.answer_type === ANSWER_TYPE.SPEAKING) {
              let speakingData = data as SpeakingQuestionResponse;
              let speakingValue = value as string | null;

              return (
                <SpeakingTest
                  setSubmitDisabled={setSubmitDisabled}
                  audioURL={speakingValue}
                  setAudioURL={setValue}
                  data={speakingData}
                  maxWords={appConfig.MAX_WRITING_WORDS}
                />
              );
            }
          })()}
          <div className="TestQuestionWrapper-button-container">
            <button className="button-green" onClick={onClearResponse}>
              Clear response
            </button>
            {/* {props.skippable && (
              <button className="button-green" onClick={props.nextPage}>
                Skip
              </button>
            )} */}
            <button
              onClick={handleNextClick}
              className={"button-green"}
              // disabled={isSubmitDisabled}
              // className={
              //   isSubmitDisabled ? "button-green-disabled" : "button-green"
              // }
            >
              {props.lastQuestion ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestQuestionWrapper;
