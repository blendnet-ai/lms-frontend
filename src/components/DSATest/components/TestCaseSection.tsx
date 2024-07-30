import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { breakText, TestCaseContext } from "../DSATest";
import HighlightedBox from "./HighlightedBox";

type TestCaseSectionProps = {
  visible: boolean;
};
export default function TestCaseSection(props: TestCaseSectionProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const exampleTestcases = useContext(TestCaseContext);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <>
      <Box sx={props.visible ? {} : { display: "none" }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          aria-label="basic tabs example"
        >
          {exampleTestcases &&
            exampleTestcases.map((testCase, index) => (
              <Tab label={`Case ${index}`} />
            ))}
        </Tabs>
        {exampleTestcases && (
          <Box
            sx={{
              paddingTop: "20px",
              paddingBottom: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              Input
            </Typography>
            <HighlightedBox>
              {breakText(exampleTestcases[currentTab].testCase)}
            </HighlightedBox>
            <Typography
              sx={{
                fontWeight: 700,
              }}
            >
              Output
            </Typography>
            <HighlightedBox>
              {breakText(exampleTestcases[currentTab].expectedOutput)}
            </HighlightedBox>
          </Box>
        )}
      </Box>
    </>
  );
}
