import { createContext, useRef, useState } from "react";
import "./DSATest.css";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Box, Button } from "@mui/material";
import * as monaco from "monaco-editor";
import DSAPracticeAPI from "../../apis/DSAPracticeAPI";

type DSATestData = {
  question: string;
  title: string;
  exampleTestcases: TestCase[];
};

export type TestCase = {
  testCase: string;
  expectedOutput: string;
};

export const TestCaseContext = createContext<TestCase[] | null>(null);

type SolutionRunningStateType = {
  running: boolean;
  setRunning: (value: boolean) => void;
};
export const SolutionRunningState =
  createContext<SolutionRunningStateType | null>(null);

export default function DSATestWrapper() {
  const data = {
    title: "Two Sum",
    question:
      '<p>Given an array of integers <code>nums</code>&nbsp;and an integer <code>target</code>, return <em>indices of the two numbers such that they add up to <code>target</code></em>.</p>\n\n<p>You may assume that each input would have <strong><em>exactly</em> one solution</strong>, and you may not use the <em>same</em> element twice.</p>\n\n<p>You can return the answer in any order.</p>\n\n<p>&nbsp;</p>\n<p><strong class="example">Example 1:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [2,7,11,15], target = 9\n<strong>Output:</strong> [0,1]\n<strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].\n</pre>\n\n<p><strong class="example">Example 2:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,2,4], target = 6\n<strong>Output:</strong> [1,2]\n</pre>\n\n<p><strong class="example">Example 3:</strong></p>\n\n<pre>\n<strong>Input:</strong> nums = [3,3], target = 6\n<strong>Output:</strong> [0,1]\n</pre>\n\n<p>&nbsp;</p>\n<p><strong>Constraints:</strong></p>\n\n<ul>\n\t<li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>\n\t<li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>\n\t<li><strong>Only one valid answer exists.</strong></li>\n</ul>\n\n<p>&nbsp;</p>\n<strong>Follow-up:&nbsp;</strong>Can you come up with an algorithm that is less than <code>O(n<sup>2</sup>)</code><font face="monospace">&nbsp;</font>time complexity?',
    exampleTestcases: [
      {
        testCase: "nums = [2,7,11,15], target = 9",
        expectedOutput: "[0,1]",
      },
      {
        testCase: "nums = [3,2,4], target = 6",
        expectedOutput: "[1,2]",
      },
      {
        testCase: "nums = [3,3], target = 6",
        expectedOutput: "[0,1]",
      },
    ],
  };
  return <DSATest {...data} />;
}

function DSATest(props: DSATestData) {
  const [isCodeEditorMaximized, setCodeEditorMaximized] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [isCodeRunning, setCodeRunning] = useState(false);

  const handleCodeEditorMaxOrMin = () => {
    setCodeEditorMaximized((prev) => !prev);
  };

  const submitSolution = () => {
    if (editorRef.current) {
      DSAPracticeAPI.submitSolution(editorRef.current.getValue());
      setCodeRunning(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
          height: "90vh",
        }}
      >
        <Button
          variant="contained"
          onClick={submitSolution}
          disabled={isCodeRunning}
        >
          Submit
        </Button>
        <PanelGroup direction="horizontal" style={{ height: "90vh" }}>
          {!isCodeEditorMaximized && (
            <LeftPanel title={props.title} question={props.question} />
          )}
          <PanelResizeHandle
            style={{
              backgroundColor: "grey",
              width: "4px",
            }}
          />
          <SolutionRunningState.Provider
            value={{ running: isCodeRunning, setRunning: setCodeRunning }}
          >
            <TestCaseContext.Provider value={props.exampleTestcases}>
              <RightPanel
                editorRef={editorRef}
                isCodeEditorMaximized={isCodeEditorMaximized}
                handleCodeEditorMaxOrMin={handleCodeEditorMaxOrMin}
              />
            </TestCaseContext.Provider>
          </SolutionRunningState.Provider>
        </PanelGroup>
      </Box>
    </>
  );
}
