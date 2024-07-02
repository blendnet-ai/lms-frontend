import { Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import { SolutionRunningState } from "../DSATest";
import DSAPracticeAPI, {
  GetStatusResponse,
  RUNNING_STATE,
} from "../../../apis/DSAPracticeAPI";
import HighlightedBox from "./HighlightedBox";

type TestResultSectionProps = {
  visible: boolean;
};
export default function TestResultSection(props: TestResultSectionProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const solutionRunningContext = useContext(SolutionRunningState);

  const [data, setData] = useState<GetStatusResponse | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  const fetchData = async () => {
    const data = await DSAPracticeAPI.getStatus();
    setData(data);

    if (data.state == RUNNING_STATE.COMPLETED && solutionRunningContext)
      solutionRunningContext.setRunning(false);
  };

  useEffect(() => {
    if (solutionRunningContext?.running) {
      setData(null);
    }
  }, [solutionRunningContext?.running]);

  useEffect(() => {
    if (solutionRunningContext?.running) {
      const interval = 2000; // 2 seconds in milliseconds

      timerRef.current = setInterval(() => {
        fetchData();
      }, interval);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [solutionRunningContext?.running]);

  return (
    <>
      <Box sx={props.visible ? {} : { display: "none" }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          {data &&
            data.result.map((_element, index) => (
              <Tab label={`Case ${index}`} />
            ))}
        </Tabs>
        {solutionRunningContext?.running && (
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

        {data && !solutionRunningContext?.running && data.result.length > 0 && (
          <Box sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
            <Typography
              sx={{
                fontWeight: "800",
                marginBottom: "10px",
              }}
            >
              Input
            </Typography>
            {data.result[currentTab].testCase.split(", ").map((element) => {
              const elementParts = element.split("=");
              return (
                <HighlightedBox>
                  {`${elementParts[0]} = `}
                  <br></br>
                  {`${elementParts[1]}`}
                </HighlightedBox>
              );
            })}
            <Typography
              sx={{
                fontWeight: "800",
                marginBottom: "10px",
              }}
            >
              Output
            </Typography>
            <HighlightedBox>{data.result[currentTab].output}</HighlightedBox>
            <Typography
              sx={{
                fontWeight: "800",
                marginBottom: "10px",
              }}
            >
              Expected Output
            </Typography>
            <HighlightedBox>
              {data.result[currentTab].expectedOutput}
            </HighlightedBox>
          </Box>
        )}
      </Box>
    </>
  );
}
