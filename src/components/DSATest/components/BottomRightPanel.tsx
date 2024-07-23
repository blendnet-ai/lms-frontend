import { Box, Tab, Tabs } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import TestCaseSection from "./TestCaseSection";
import { Panel } from "react-resizable-panels";
import TestResultSection from "./TestResultSection";
import { BottomRightPanelContext, CodeState } from "../DSATest";

type BottomRightPanelProps = {};

const TAB_LABELS = ["Testcase", "Test Result"];

enum TAB {
  TESTCASE,
  TEST_RESULT,
}

export default function BottomRightPanel(props: BottomRightPanelProps) {
  const [currentTab, setCurrentTab] = useState(0);

  const context = useContext(BottomRightPanelContext);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    if (context?.codeState == CodeState.SUBMITTING) {
      setCurrentTab(TAB.TEST_RESULT);
    }
  }, [context?.codeState]);

  return (
    <Panel
      style={{
        overflowY: "scroll",
        backgroundColor: "white",
        borderRadius: "10px",
        border: "1px solid #CFE4FF",
      }}
    >
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label="basic tabs example"
      >
        {TAB_LABELS.map((tabLabel) => (
          <Tab label={tabLabel} />
        ))}
      </Tabs>

      <Box sx={{ padding: "10px" }}>
        <TestCaseSection visible={currentTab === TAB.TESTCASE} />
        <TestResultSection visible={currentTab === TAB.TEST_RESULT} />
      </Box>
    </Panel>
  );
}
