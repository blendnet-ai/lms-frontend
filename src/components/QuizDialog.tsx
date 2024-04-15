import { Close } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { InVideoQues } from "../apis/VideoDataAPI";
import SubmitQuestionResponse from "../apis/SubmitQuestionResponseAPI";

type Props = {
  videoId: string;
  question: InVideoQues;
  chapterId: string;
  isOpen: boolean;
  onClose: () => void;
  container: any;
};

enum State {
  UNATTEMPTED,
  RIGHT,
  WRONG,
}

function QuizDialog({
  videoId,
  question,
  chapterId,
  isOpen,
  onClose,
  container,
}: Props) {
  const getInitState = () => {
    if (question.attempted) {
      if (question.user_score > 0) {
        return State.RIGHT;
      } else {
        return State.WRONG;
      }
    } else {
      return State.UNATTEMPTED;
    }
  };

  const getInitResponse = () => {
    const intiState = getInitState();
    if (intiState == State.UNATTEMPTED) {
      return -1;
    } else {
      return question.marked_answer;
    }
  };

  useEffect(() => {
    if (isOpen) console.log("yes");
  }, [question]);

  const [state, setState] = useState(getInitState());
  const [response, setResponse] = useState<number>(getInitResponse());

  const onResponseSubmit = async () => {
    let score_added = (
      await SubmitQuestionResponse.submitMCQResponse(
        videoId,
        question.id,
        chapterId,
        response
      )
    ).score_added;
    console.log(score_added);

    if (score_added === 0) {
      setState(State.WRONG);
    } else {
      console.log("RIGHT");
      setState(State.RIGHT);
    }
  };

  const onResponseChange = (response: number) => {
    setResponse(response);
  };

  const getOptionColor = (optionIdx: number) => {
    if (state == State.WRONG && response == optionIdx) {
      return "red";
    }
    if (state == State.RIGHT && response == optionIdx) {
      return "green";
    }
    return "black";
  };

  const onRetryClicked = () => {
    setState(State.UNATTEMPTED);
    setResponse(-1);
  };

  return (
    <Dialog
      container={container.current}
      sx={{ zIndex: 9999 }}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="id">
        <Box display="flex" alignItems="center">
          <Box flexGrow={1} sx={{ textAlign: "left" }}>
            {"Select the correct option"}
          </Box>
          <Box>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ textAlign: "left" }}>
          {question.text}
        </DialogContentText>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={response}
        >
          {question.options.map((option, i) => (
            <FormControlLabel
              value={option}
              sx={{ color: getOptionColor(i) }}
              onChange={() => onResponseChange(i)}
              control={
                <Radio
                  disabled={state != State.UNATTEMPTED}
                  value={i}
                  sx={{
                    "&.Mui-checked": {
                      color: getOptionColor(i),
                    },
                  }}
                />
              }
              label={option}
            />
          ))}
        </RadioGroup>
      </DialogContent>

      {state == State.UNATTEMPTED && (
        <DialogActions>
          <Button onClick={onResponseSubmit}>Submit</Button>
        </DialogActions>
      )}
      {state == State.WRONG && (
        <div>
          <Alert severity="error">Wrong answer, please retry.</Alert>
          <DialogActions>
            <Button onClick={onRetryClicked}>Retry</Button>
          </DialogActions>
        </div>
      )}
      {state == State.RIGHT && (
        <div>
          <Alert severity="success">Correct answer, well Done!</Alert>
          <DialogActions>
            <Button onClick={onClose}>Continue</Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
}

export default QuizDialog;
