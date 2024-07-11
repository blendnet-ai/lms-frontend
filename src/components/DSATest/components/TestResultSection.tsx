import { Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import DSAPracticeAPI, {
  GetStatusResponse,
  RUNNING_STATE,
} from "../../../apis/DSAPracticeAPI";
import HighlightedBox from "./HighlightedBox";
import { circIn } from "framer-motion";
import { Check, Clear } from "@mui/icons-material";
import { CodeState, TestResultContext } from "../DSATest";

type TestResultSectionProps = {
  visible: boolean;
};
export default function TestResultSection(props: TestResultSectionProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const solutionRunningContext = useContext(TestResultContext);

  const [data, setData] = useState<GetStatusResponse | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const fetchData = async () => {
    if (!solutionRunningContext) return;

    const data = await DSAPracticeAPI.getStatus(
      solutionRunningContext.questionId,
      solutionRunningContext.assessmentId
    );
    setData(data);

    if (data.test_cases) solutionRunningContext.setCodeState(CodeState.IDLE);
  };

  useEffect(() => {
    if (solutionRunningContext?.codeState != CodeState.IDLE) {
      setData(null);
    }
  }, [solutionRunningContext?.codeState]);

  useEffect(() => {
    if (solutionRunningContext?.codeState == CodeState.RUNNING) {
      const interval = 2000; // 2 seconds in milliseconds

      timerRef.current = setInterval(() => {
        fetchData();
      }, interval);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [solutionRunningContext?.codeState]);
  const shouldRenderError =
    data && data.test_cases.some((element) => !element.passed);

  return (
    <>
      <Box sx={props.visible ? {} : { display: "none" }}>
        {shouldRenderError && (
          <Typography
            sx={{
              fontWeight: "800",
              marginBottom: "10px",
              color: "red",
              fontSize: "24px",
            }}
          >
            Wrong Answer
          </Typography>
        )}
        {data && !shouldRenderError && (
          <Typography
            sx={{
              fontWeight: "800",
              marginBottom: "10px",
              color: "green",
              fontSize: "24px",
            }}
          >
            Accepted
          </Typography>
        )}
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          {data &&
            data.test_cases.map((element, index) => (
              <Tab
                icon={element.passed ? <Check /> : <Clear />}
                iconPosition="start"
                label={`Case ${index}`}
              />
            ))}
        </Tabs>
        {solutionRunningContext?.codeState != CodeState.IDLE && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {data &&
          !(solutionRunningContext?.codeState != CodeState.IDLE) &&
          data.test_cases.length > 0 && (
            <Box sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
              {data.test_cases[currentTab].error != "" && (
                <>
                  <Typography
                    sx={{
                      fontWeight: "800",
                      marginBottom: "10px",
                      color: "red",
                      fontSize: "24px",
                    }}
                  >
                    Runtime Error
                  </Typography>
                  <HighlightedBox error={true}>
                    <Typography
                      sx={{
                        fontWeight: "500",
                        marginBottom: "10px",
                        color: "red",
                      }}
                    >
                      {data.test_cases[currentTab].error}
                    </Typography>
                  </HighlightedBox>
                </>
              )}
              <Typography
                sx={{
                  fontWeight: "800",
                  marginBottom: "10px",
                }}
              >
                Input
              </Typography>
              {data.test_cases[currentTab].inputs.split(", ").map((element) => {
                const elementParts = element.split("=");
                return (
                  <HighlightedBox>
                    {`${elementParts[0]} = `}
                    <br></br>
                    {`${elementParts[1]}`}
                  </HighlightedBox>
                );
              })}
              {data.test_cases[currentTab].error == "" && (
                <>
                  <Typography
                    sx={{
                      fontWeight: "800",
                      marginBottom: "10px",
                    }}
                  >
                    Output
                  </Typography>
                  <HighlightedBox>
                    {data.test_cases[currentTab].output}
                  </HighlightedBox>
                </>
              )}
              <Typography
                sx={{
                  fontWeight: "800",
                  marginBottom: "10px",
                }}
              >
                Expected Output
              </Typography>
              <HighlightedBox>
                {data.test_cases[currentTab].expected}
              </HighlightedBox>
            </Box>
          )}
      </Box>
    </>
  );
}
