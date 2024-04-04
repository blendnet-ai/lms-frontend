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
import Dialog, { dialogClasses } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { InVideoQues } from "../apis/VideoDataAPI";
import SubmitQuestionResponse from "../apis/SubmitQuestionResponseAPI";
import { stat } from "fs";

type Props = {
  videoId: string;
  question: InVideoQues;
  isOpen: boolean;
  onClose: () => void;
};

enum State {
  UNATTEMPTED,
  RIGHT,
  WRONG,
}

function QuizDialog({ videoId, question, isOpen, onClose }: Props) {
  const [state, setState] = useState(State.UNATTEMPTED);
  const [response, setResponse] = useState<string>("");

  const onResponseSubmit = async () => {
    let score_added = (
      await SubmitQuestionResponse.submitMCQResponse(
        videoId,
        question.id,
        response
      )
    ).score_added;

    if (score_added == 0) {
      setState(State.WRONG);
    } else {
      setState(State.RIGHT);
    }
  };

  const onResponseChange = (event: any) => {
    setResponse(event.target.value);
  };

  const getOptionColor = (option: string) => {
    if (state == State.WRONG && response == option) {
      return "red";
    }
    if (state == State.RIGHT && response == option) {
      return "green";
    }
    return "black";
  };

  const onRetryClicked = () => {
    setState(State.UNATTEMPTED);
    setResponse("");
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="id">
        <Box display="flex" alignItems="center">
          <Box flexGrow={1}>{"Select the correct option"}</Box>
          <Box>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{question.text}</DialogContentText>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={response}
        >
          {question.options.map((option, i) => (
            <FormControlLabel
              value={option}
              sx={{ color: getOptionColor(option) }}
              onChange={(event, _) => onResponseChange(event)}
              control={
                <Radio
                  disabled={state != State.UNATTEMPTED}
                  sx={{
                    "&.Mui-checked": {
                      color: getOptionColor(option),
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
