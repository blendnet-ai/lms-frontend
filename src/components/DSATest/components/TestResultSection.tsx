import { Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import DSAPracticeAPI, {
  GetStatusResponse,
  RUNNING_STATE,
  TestCaseResult,
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
  const context = useContext(TestResultContext);

  const [runTimeError, setRunTimeError] = useState("");

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const fetchData = async () => {
    if (!context) return;

    const data = await DSAPracticeAPI.getStatus(
      context.questionId,
      context.assessmentId
    );

    setRunTimeError("");

    let testCasesToSend: TestCaseResult[] = [];

    if (data) {
      for (let i = 0; i < data.test_cases.length; i++) {
        const testCase = data.test_cases[i];
        if (testCase.error == "") {
          testCasesToSend.push(testCase);
        } else {
          testCasesToSend = [testCase];
          setRunTimeError(testCase.error);
          break;
        }
      }
    }

    data.test_cases = testCasesToSend;
    context.setTestCasesRunData(data);

    if (data.test_cases) context.setCodeState(CodeState.IDLE);
  };

  useEffect(() => {
    if (context?.codeState != CodeState.IDLE) {
      context?.setTestCasesRunData(null);
    }
  }, [context?.codeState]);

  useEffect(() => {
    if (context?.codeState == CodeState.RUNNING) {
      const interval = 2000; // 2 seconds in milliseconds

      timerRef.current = setInterval(() => {
        fetchData();
      }, interval);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [context?.codeState]);
  const shouldRenderError =
    context?.testCasesRunData &&
    context?.testCasesRunData.test_cases.some((element) => !element.passed);

  return (
    <>
      <Box sx={props.visible ? {} : { display: "none" }}>
        {shouldRenderError && !runTimeError && (
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
        {context?.testCasesRunData && !shouldRenderError && (
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
        {runTimeError &&
          context?.testCasesRunData &&
          context?.testCasesRunData.test_cases[0].error != "" && (
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
                  {context?.testCasesRunData.test_cases[currentTab].error}
                </Typography>
              </HighlightedBox>
            </>
          )}

        {!runTimeError && (
          <>
            <Tabs
              value={currentTab}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              {context?.testCasesRunData &&
                context?.testCasesRunData.test_cases.map((element, index) => (
                  <Tab
                    icon={element.passed ? <Check /> : <Clear />}
                    iconPosition="start"
                    label={`Case ${index}`}
                  />
                ))}
            </Tabs>
            {context?.testCasesRunData &&
              !(context?.codeState != CodeState.IDLE) &&
              context?.testCasesRunData.test_cases.length > 0 && (
                <Box sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
                  <Typography
                    sx={{
                      fontWeight: "800",
                      marginBottom: "10px",
                    }}
                  >
                    Input
                  </Typography>
                  {context?.testCasesRunData.test_cases[currentTab].inputs
                    .split(", ")
                    .map((element) => {
                      const elementParts = element.split("=");
                      return (
                        <HighlightedBox>
                          {`${elementParts[0]} = `}
                          <br></br>
                          {`${elementParts[1]}`}
                        </HighlightedBox>
                      );
                    })}
                  {context?.testCasesRunData.test_cases[currentTab].error ==
                    "" && (
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
                        {
                          context?.testCasesRunData.test_cases[currentTab]
                            .output
                        }
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
                    {context?.testCasesRunData.test_cases[currentTab].expected}
                  </HighlightedBox>
                </Box>
              )}
          </>
        )}

        {context?.codeState != CodeState.IDLE && (
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
      </Box>
    </>
  );
}
