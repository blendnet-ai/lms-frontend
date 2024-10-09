import { Box, Button, CardMedia, Skeleton, Typography } from "@mui/material";
import { Card } from "../DSAPracticeReport";
import { icons } from "../../../assets";
import { ReportStatus } from "../../../apis/EvalAPI";
import { TestCaseResult } from "../../../apis/DSAPracticeAPI";

type CorrectnessProps = {
  score?: number | null;
  feedback?: string | null;
  detailedReport?: boolean;
  isFailedTestCases: TestCaseResult[];
  status: ReportStatus;
  clickToOpenTestCasesModal?: () => void;
};

export default function Correctness(props: CorrectnessProps) {
  return (
    <Card>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          alignItems: "flex-start",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            backgroundColor: "#E3FFF4",
            padding: "5px",
            width: "40px",
            height: "40px",
            borderRadius: "5px",
          }}
          src={icons.clipboardTick}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography
            sx={{
              color: props.isFailedTestCases.length > 0 ? "red" : "#00A86B",
              fontWeight: "550",
              fontSize: "20px",
            }}
          >
            Correctness {props.score != null ? `${props.score}/50` : "?/50"}
          </Typography>
          {props.feedback ? (
            <Typography>{props.feedback}</Typography>
          ) : (
            <Skeleton variant="rectangular" width={"100%"} height={25} />
          )}
        </Box>
      </Box>
      {/* failed test cases button  */}
      <Box
        sx={{
          display: props.isFailedTestCases.length > 0 ? "flex" : "none",
          mt: 2,
          justifyContent: "center",
        }}
      >
        <Button
          sx={{
            borderRadius: "10px",
            backgroundColor: "#FFD3D0",
            color: "red",
            padding: "10px 15px",
            "&:hover": {
              backgroundColor: "#FFE5E5",
            },
          }}
          onClick={props.clickToOpenTestCasesModal}
        >
          <Typography
            sx={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            Show All Failed Test Cases
          </Typography>
        </Button>
      </Box>
    </Card>
  );
}
