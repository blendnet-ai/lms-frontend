import { useEffect, useMemo, useState } from "react";
import {
  Divider,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { MCQQuestionResponse, MMCQQuestionResponse } from "../../apis/EvalAPI";
import "./MMCQTest.css";
import { PlayArrow, Stop } from "@mui/icons-material";
import splitIntoParagraphs from "../../utils/paragraphBreaker";

type MMCQTestProps = {
  data: MMCQQuestionResponse;
  selected: (number | null)[] | null;
  setSelected: (arg1: (number | null)[] | null) => void;
  setSubmitDisabled: (disabled: boolean) => void;
};

function MMCQTest(props: MMCQTestProps) {
  const handleOptionSelect = (newOption: number | null, index: number) => {
    let selected: (number | null)[] | null = props.selected;

    if (selected == null) {
      selected = new Array(props.data.questions.length).fill(null);
    } else {
      selected = [...selected];
    }
    selected[index] = newOption;
    props.setSelected(selected);
  };
  const [audioPlaying, setAudioPlaying] = useState(false);

  const audio = useMemo(
    () => (props.data.audio_url ? new Audio(props.data.audio_url) : null),
    []
  );

  useEffect(() => {
    const shouldSubmitBeDisabled = () => {
      const mmcqValue = props.selected as (null | number)[] | null;
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
    };
    props.setSubmitDisabled(shouldSubmitBeDisabled());
  }, [props.selected]);

  useEffect(() => {
    if (!audio) return;
    audio.addEventListener("ended", () => setAudioPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setAudioPlaying(false));
    };
  }, [audio]);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  const handleAudioPlayerClick = () => {
    setAudioPlaying((prevValue) => {
      const newValue = !prevValue;
      if (audio) {
        if (newValue) {
          audio.play();
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
      }
      return newValue;
    });
  };

  return (
    <div className="MMCQTest">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {props.data.paragraph &&
          splitIntoParagraphs(props.data.paragraph).map((paragraph, i) => (
            <p style={{ margin: "0" }} key={i}>
              {paragraph}
            </p>
          ))}
      </div>

      {props.data.audio_url && (
        <div className="MMCQTest-audio-container">
          <div className="MMCQTest-audio">
            <IconButton
              onClick={handleAudioPlayerClick}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                color: "white",
                height: "100%",
              }}
            >
              {audioPlaying ? (
                <Stop fontSize="large" />
              ) : (
                <PlayArrow fontSize="large" />
              )}
            </IconButton>
          </div>
          <div className="MMCQTest-audio-text">Press to play audio</div>
        </div>
      )}

      {props.data.image_url &&
        props.data.image_url.map((image_url, i) => {
          return <img key={i} src={image_url} alt="NA" />;
        })}
      <Divider component="li" />
      {props.data.questions.map((question, i) => {
        return (
          <>
            <div className="MMCQTest-question-heading">Question</div>
            <div>{question.question}</div>
            <ToggleButtonGroup
              value={props.selected != null ? props.selected[i] : null}
              exclusive
              onChange={(_, newOption) => handleOptionSelect(newOption, i)}
            >
              <div className="MMCQTest-ToggleButtonGroup">
                {question.options.map((option, i) => (
                  <ToggleButton key={i} value={i} color="primary">
                    {option}
                  </ToggleButton>
                ))}
              </div>
            </ToggleButtonGroup>
            <Divider component="li" />
          </>
        );
      })}
    </div>
  );
}

export default MMCQTest;
