import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import TestCaseSection from "./TestCaseSection";
import { Panel } from "react-resizable-panels";

type BottomRightDrawerProps = {};

const TAB_LABELS = ["Testcase", "Test Result"];

enum TAB {
  TESTCASE,
  TEST_RESULT,
}

export default function BottomRightDrawer(props: BottomRightDrawerProps) {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <Panel>
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
        {currentTab == TAB.TESTCASE && <TestCaseSection />}
        {currentTab == TAB.TEST_RESULT && <div>testresult</div>}
      </Box>
    </Panel>
  );
}
