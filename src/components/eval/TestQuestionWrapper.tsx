import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import EvalAPI, {
  MCQQuestionResponse,
  MMCQQuestionResponse,
  SpeakingQuestionResponse,
  WritingQuestionResponse,
} from "../../apis/EvalAPI";
import "./../../styles/eval/TestQuestionWrapper.css";
import MCQTest from "./MCQTest";
import MMCQTest from "./MMCQTest";
import WritingTest from "./WritingTest";
import { CalculationsUtil } from "../../utils/calculations";
import appConfig from "../../configs/app";
import SpeakingTest from "./SpeakingTest";
import { upload } from "@testing-library/user-event/dist/upload";
import env from "react-dotenv";
import { NextPlan } from "@mui/icons-material";

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
};

enum ANSWER_TYPE {
  MCQ = 0,
  MMCQ = 1,
  WRITING = 2,
  SPEAKING = 3,
}

function TestQuestionWrapper(props: PersonalityMCQProps) {
  const [data, setData] = useState<
    | MCQQuestionResponse
    | MMCQQuestionResponse
    | WritingQuestionResponse
    | SpeakingQuestionResponse
    | null
  >(null);
  const [value, setValue] = useState(props.submittedValue);

  useEffect(() => {
    (async () => {
      try {
        const fetchedData = await EvalAPI.getQuestion(
          props.questionId,
          props.assessmentId
        );
        setData(fetchedData);
      } catch (error) {
        console.log(
          `Error in fetching/setting question data for ${props.questionId}: ${error}`
        );
      }
    })();
  }, [props.questionId, props.assessmentId]);

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

    if (response && response != undefined && response.ok) {
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
    if (isSumitDisabled()) {
      props.nextPage();
    } else {
      submitAndNext();
    }
  };

  const submitAndNext = () => {
    if (value === null) return;
    props.updateSubmittedValue(props.questionId, value);
    console.log("anstyoe");
    console.log(data?.answer_type);

    if (data?.answer_type == ANSWER_TYPE.MCQ) {
      const mcqValue = value as number;
      EvalAPI.submitMCQ(props.questionId, props.assessmentId, mcqValue);
    }
    if (data?.answer_type == ANSWER_TYPE.MMCQ) {
      const mmcqValue = value as (number | null)[];
      EvalAPI.submitMMCQ(props.questionId, props.assessmentId, mmcqValue);
    }
    if (data?.answer_type == ANSWER_TYPE.WRITING) {
      const writingValue = value as string;
      EvalAPI.submitWriting(props.questionId, props.assessmentId, writingValue);
    }
    if (data?.answer_type == ANSWER_TYPE.SPEAKING) {
      const speakingData = data as SpeakingQuestionResponse;
      const speakingValue = value as string;
      uploadAudioFile(speakingValue, speakingData.answer_audio_url);
      EvalAPI.submitSpeaking(props.questionId, props.assessmentId);
    }

    props.nextPage();
  };

  const isSumitDisabled = () => {
    if (data?.answer_type === ANSWER_TYPE.MCQ) {
      return value === null;
    } else if (data?.answer_type === ANSWER_TYPE.MMCQ) {
      const mmcqValue = value as (null | number)[] | null;
      if (mmcqValue == null) {
        return true;
      }
      let nullValue = false;
      mmcqValue.map((value) => {
        if (value === null) {
          nullValue = true;
        }
      });
      return nullValue;
    } else if (data?.answer_type === ANSWER_TYPE.WRITING) {
      const writingValue = value as string;
      return (
        writingValue === null ||
        writingValue.trim() === "" ||
        CalculationsUtil.countWords(writingValue) > appConfig.MAX_WRITING_WORDS
      );
    } else if (data?.answer_type === ANSWER_TYPE.SPEAKING) {
      const speakingData = data as SpeakingQuestionResponse;
      return value === speakingData.answer_audio_url || value == null;
    }
  };

  return (
    <div className="TestQuestionWrapper">
      {!data && (
        <div className="TestQuestionWrapper-CircularProgress">
          <CircularProgress size={100} />
        </div>
      )}

      {env.ENV != "prod" && (
        <div className="TestQuestionWrapper-questionId">{`Question id: ${props.questionId}`}</div>
      )}
      {data && (
        <div className="TestQuestionWrapper-inner">
          {(() => {
            if (data?.answer_type === ANSWER_TYPE.MCQ) {
              const mcqData = data as MCQQuestionResponse;
              const mcqValue = value as number;
              return (
                <MCQTest
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
              className="button-green"
              // disabled={isNextDisabled()}
              // className={
              //   isNextDisabled() ? "button-green-disabled" : "button-green"
              // }
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TestQuestionWrapper;
