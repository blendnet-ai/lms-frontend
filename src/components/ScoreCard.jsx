import CustomCircularProgress from "./CustomCircularProgress";
import "./../styles/ScoreCard.css";
import { CircularProgress } from "@mui/material";

const ScoreCard = ({ title, filledValue, innerValue, innerColor }) => {
  return (
    <div className="ScoreCard">
      <div>{title}</div>
      {filledValue != null && (
        <CustomCircularProgress
          filledValue={filledValue}
          innerValue={innerValue}
          innerColor={innerColor}
        />
      )}
      {filledValue == null && <CircularProgress size={100} />}
    </div>
  );
};

export default ScoreCard;
