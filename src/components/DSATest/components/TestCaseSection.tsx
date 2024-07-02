import { Box, Tab, Tabs } from "@mui/material";
import { useContext, useState } from "react";
import { TestCaseContext } from "../DSATest";
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
          <Box sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
            {exampleTestcases[currentTab].testCase
              .split(", ")
              .map((element) => {
                const elementParts = element.split("=");
                return (
                  <Box>
                    <Box
                      sx={{
                        marginBottom: "10px",
                      }}
                    >{`${elementParts[0]} = `}</Box>
                    <HighlightedBox>{elementParts[1]}</HighlightedBox>
                  </Box>
                );
              })}
          </Box>
        )}
      </Box>
    </>
  );
}
