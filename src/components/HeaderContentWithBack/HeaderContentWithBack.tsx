import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./HeaderContentWithBack.css";

type HeaderContentWithBackProps = {
  heading: string;
  onBackClickOverride?: () => void;
  hideBack?: boolean;
};
export default function HeaderContentWithBack(
  props: HeaderContentWithBackProps
) {
  const navigate = useNavigate();
  console.log();

  return (
    <div className="HeaderContentWithBack">
      <IconButton
        style={
          props.hideBack
            ? {
                visibility: "hidden",
              }
            : {}
        }
        onClick={() =>
          props.onBackClickOverride ? props.onBackClickOverride() : navigate(-1)
        }
      >
        <ArrowBack style={{ color: "white" }} />
      </IconButton>
      <h2>{props.heading}</h2>
    </div>
  );
}
