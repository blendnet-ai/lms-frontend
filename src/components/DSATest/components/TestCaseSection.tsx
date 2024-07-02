import { Box, Tab, Tabs } from "@mui/material";
import { useContext, useState } from "react";
import { TestCaseContext } from "../DSATest";

export default function TestCaseSection() {
  const [currentTab, setCurrentTab] = useState(0);
  const exampleTestcases = useContext(TestCaseContext);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  return (
    <>
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
          {exampleTestcases[currentTab].testCase.split(", ").map((element) => {
            const elementParts = element.split("=");
            return (
              <Box>
                <Box
                  sx={{
                    marginBottom: "10px",
                  }}
                >{`${elementParts[0]} = `}</Box>
                <Box
                  sx={{
                    padding: "10px",
                    background: "#f5f5f5",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {elementParts[1]}
                </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
}
