import { Modal } from "@mui/material";
import "./../../styles/eval/EvalTestConfim.css";
import Box from "@mui/material/Box";

type EvalTestConfimProps = {
  heading: string;
  des: string;
  btn1Text: string;
  btn2Text: string;
  onBtn1Clicked: () => void;
  onBtn2Clicked: () => void;
  open: boolean;
};
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "240px",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3.5,
};

export default function EvalTestConfim(props: EvalTestConfimProps) {
  return (
    <Modal
      open={props.open}
      onClose={props.onBtn1Clicked}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="EvalTestSubmitConfim">
          <img
            className="EvalTestSubmitConfim-img"
            src="/illustrations/test-confirm.svg"
          />
          <div className="EvalTestSubmitConfim-text-container">
            <h2 className="EvalTestSubmitConfim-heading">{props.heading}</h2>
            <div className="EvalTestSubmitConfim-des">{props.des}</div>
          </div>
          <div className="btn-container EvalTestSubmitConfim-btn-container">
            <button onClick={props.onBtn1Clicked}>{props.btn1Text}</button>
            <button onClick={props.onBtn2Clicked}>{props.btn2Text}</button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
