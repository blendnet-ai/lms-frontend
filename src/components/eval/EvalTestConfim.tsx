import "./../../styles/eval/EvalTestConfim.css";

type EvalTestConfimProps = {
  heading: string;
  des: string;
  btn1Text: string;
  btn2Text: string;
  onBtn1Clicked: () => void;
  onBtn2Clicked: () => void;
};

export default function EvalTestConfim(props: EvalTestConfimProps) {
  return (
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
        <button
          className="button-yellow-secondary"
          onClick={props.onBtn1Clicked}
        >
          {props.btn1Text}
        </button>
        <button onClick={props.onBtn2Clicked}>{props.btn2Text}</button>
      </div>
    </div>
  );
}
