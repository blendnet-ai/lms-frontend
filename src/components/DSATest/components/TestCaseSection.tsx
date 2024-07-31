import {
  Box,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { TestCaseContext, breakText } from "../DSATest";
import HighlightedBox from "./HighlightedBox";
import { Add, Clear } from "@mui/icons-material";

type TestCaseSectionProps = {
  visible: boolean;
};
export default function TestCaseSection(props: TestCaseSectionProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const context = useContext(TestCaseContext);

  const addCustomTestCase = () => {
    if (!context || !context.testCases) return;
    const testCases = [...context.customTestCases];
    const referenceTestCase = { ...context.testCases[0] };

    testCases.push(referenceTestCase);

    context.setCustomTestCases(testCases);
    setCurrentTab(context.testCases.length + context.customTestCases.length);
  };

  const removeCustomTestCase = (indexToRemove: number) => {
    if (!context) return;

    if (context.testCases) {
      if (currentTab - context.testCases?.length == indexToRemove) {
      }

      if (currentTab - context.testCases?.length >= indexToRemove) {
        setCurrentTab(currentTab - 1);
      }
    }
    context.setCustomTestCases(
      context.customTestCases.filter((item, index) => index !== indexToRemove)
    );
  };

  const handleCustomTestCaseChange = (
    value: string,
    index: number,
    isInput: boolean
  ) => {
    if (!context) return;
    if (context && !context.testCases) return;
    const testCaseNew = context.customTestCases[index];

    if (isInput) {
      testCaseNew.testCase = value;
    } else {
      testCaseNew.expectedOutput = value;
    }
    const updatedTestCases = [...context.customTestCases];

    updatedTestCases[index] = testCaseNew;

    context.setCustomTestCases(updatedTestCases);
  };

  const getCurrentTabContent = (currentTab: number) => {
    if (!context) return;
    let testCase = "";
    let output = "";
    let editable = false;
    let index = 0;
    if (context.testCases && currentTab < context.testCases?.length) {
      testCase = context.testCases[currentTab].testCase;
      output = context.testCases[currentTab].expectedOutput;
      index = currentTab;
    } else {
      const exampleTestcasesLen = context.testCases
        ? context.testCases.length
        : 0;
      testCase =
        context.customTestCases[currentTab - exampleTestcasesLen].testCase;
      output =
        context.customTestCases[currentTab - exampleTestcasesLen]
          .expectedOutput;
      editable = true;
      index = currentTab - exampleTestcasesLen;
    }

    return (
      <Box>
        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          Input
        </Typography>
        {editable ? (
          <TextField
            sx={{
              padding: "0px",
            }}
            id={index.toString()}
            size="small"
            value={testCase}
            multiline
            onChange={(e) => {
              handleCustomTestCaseChange(e.target.value, index, true);
            }}
          />
        ) : (
          <HighlightedBox>{breakText(testCase)}</HighlightedBox>
        )}

        <Typography
          sx={{
            fontWeight: 700,
          }}
        >
          Output
        </Typography>

        {editable ? (
          <TextField
            sx={{
              padding: "0px",
            }}
            size="small"
            value={output}
            multiline
            onChange={(e) => {
              handleCustomTestCaseChange(e.target.value, index, false);
            }}
          />
        ) : (
          <HighlightedBox>{breakText(output)}</HighlightedBox>
        )}
      </Box>
    );
  };

  return (
    <>
      <Box sx={props.visible ? {} : { display: "none" }}>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <Tabs
            value={currentTab}
            scrollButtons="auto"
            variant="scrollable"
            sx={{
              maxWidth: "80%",
            }}
            aria-label="scrollable auto tabs example"
          >
            {context &&
              context.testCases &&
              context.testCases.map((_, index) => (
                <Tab
                  icon={
                    <Clear
                      sx={{
                        visibility: "hidden",
                        width: "20px",
                        padding: "0px",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCustomTestCase(index);
                      }}
                    />
                  }
                  iconPosition="end"
                  sx={{
                    padding: "0px 0px",
                    paddingBottom: "-10px",
                    margin: "-10px 0px",
                  }}
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0px",
                        paddingBlockStart: "0px",
                        paddingBlockEnd: "0px",
                      }}
                    >
                      <Typography
                        onClick={() => setCurrentTab(index)}
                      >{`Case ${index}`}</Typography>{" "}
                    </Box>
                  }
                />
              ))}
            {context &&
              context.customTestCases &&
              context.customTestCases.map((_, index: number) => (
                <Tab
                  icon={
                    <Clear
                      sx={{
                        width: "20px",
                        padding: "0px",
                      }}
                      onClick={() => removeCustomTestCase(index)}
                    />
                  }
                  iconPosition="end"
                  sx={{
                    padding: "0px 10px",
                    paddingBottom: "-10px",
                    margin: "-10px 0px",
                  }}
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "0px",
                      }}
                    >
                      <Typography
                        onClick={() =>
                          setCurrentTab(
                            context && context.testCases
                              ? context.testCases?.length + index
                              : 0
                          )
                        }
                      >{`Case ${
                        (context && context.testCases
                          ? context.testCases?.length
                          : 0) + index
                      }`}</Typography>{" "}
                    </Box>
                  }
                />
              ))}
          </Tabs>
          <IconButton onClick={addCustomTestCase}>
            <Add />
          </IconButton>
        </Box>
        {context && context.testCases && (
          <Box sx={{ paddingTop: "20px", paddingBottom: "20px" }}>
            {getCurrentTabContent(currentTab)}
          </Box>
        )}
      </Box>
    </>
  );
}
