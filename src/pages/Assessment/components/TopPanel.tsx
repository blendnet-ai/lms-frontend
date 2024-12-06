import { Box, Typography } from "@mui/material";
import { Button } from "@mui/material";
import EvalAPI from "../../../apis/EvalAPI";
import Timer from "../../../components/Timer";

interface TopPanelProps {
  heading: string;
  questionModal: () => void;
  confirmationModal: () => void;
  TimeUpHandler: any;
  assessmentId: string;
}

const TopPanel = (props: TopPanelProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: "10px",
        width: "100%",
        gap: "10px",
      }}
    >
      <Typography
        sx={{
          color: "#000",
          fontSize: "1.5rem",
        }}
      >
        {props.heading}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        {/* timer  */}
        <Timer
          assessmentId={Number(props.assessmentId)}
          submitSolution={props.TimeUpHandler}
          ApiClass={EvalAPI}
          navigationUrl="/fetch-individual-scorecard?assessment_id?assessment_id"
        />
        {/* button  */}
        <Button
          sx={{
            borderRadius: "10px",
            backgroundColor: "#2059EE",
            color: "white",
          }}
          onClick={props.questionModal}
          variant="contained"
        >
          Question Navigator
        </Button>
        <Button
          sx={{
            borderRadius: "10px",
            backgroundColor: "#ED5050",
            color: "white",
            "&:hover": {
              backgroundColor: "#ED5050",
            },
          }}
          onClick={props.confirmationModal}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default TopPanel;
