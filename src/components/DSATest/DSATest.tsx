import { createContext, useEffect, useRef, useState } from "react";
import "./DSATest.css";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import { PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Box, Button } from "@mui/material";
import * as monaco from "monaco-editor";
import DSAPracticeAPI from "../../apis/DSAPracticeAPI";
import ChatBot from "./components/ChatBot";
import EvalAPI, {
  Assessment,
  DSACodingQuestionResponse,
} from "../../apis/EvalAPI";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Difficulty } from "../DifficultyChip/DifficultyChip";

type DSATestData = {
  question: string;
  title: string;
  exampleTestcases: TestCase[];
  questionId: number;
  assessmentId: number;
  difficulty: Difficulty;
};

export type TestCase = {
  testCase: string;
  expectedOutput: string;
};

export const TestCaseContext = createContext<TestCase[] | null>(null);

type TestResultContextType = {
  codeState: CodeState;
  setCodeState: (value: CodeState) => void;
  questionId: number;
  assessmentId: number;
};

export enum CodeState {
  IDLE,
  SUBMITTING,
  RUNNING,
}

export const TestResultContext = createContext<TestResultContextType | null>(
  null
);

export const SUPPORTED_LANGUAGES = ["python", "java", "javascript", "cpp"];

export function DSAPracticeStart() {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    (async () => {
      const response = await EvalAPI.startAssessment(Assessment.DSA_PRACTICE);

      const assessmentId = response.assessment_id;

      const data = await EvalAPI.getData(assessmentId);

      const questionId = data.question_list[0].questions[0];

      navigate(
        `/923011?assessment_id=${assessmentId}&question_id=${questionId}`
      );
    })();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleStartAssessment}>
        Start
      </Button>
    </div>
  );
}

export default function DSATestWrapper() {
  const [data, setData] = useState<DSACodingQuestionResponse>();

  const [searchParams, _] = useSearchParams();

  const [assessmentId, setAssessmentId] = useState(0);

  useEffect(() => {
    (async () => {
      const assessmentId = searchParams.get("assessment_id");
      if (assessmentId) setAssessmentId(parseInt(assessmentId));
      const questionId = searchParams.get("question_id");
      if (assessmentId && questionId) {
        const fetchedData = await EvalAPI.getQuestion(
          parseInt(questionId),
          parseInt(assessmentId)
        );
        setData(fetchedData as DSACodingQuestionResponse);
        console.log("HERE");
        console.log(data);
      }
    })();
  }, []);

  useEffect(() => {}, []);

  const hardcodedData = {
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
    questionId: 1,
    assessmentId: 1,
  };
  if (data)
    return (
      <DSATest
        difficulty={Difficulty.EASY}
        question={data.question}
        questionId={data.question_id}
        assessmentId={assessmentId}
        title={data.questionTitle}
        exampleTestcases={data.exampleTestcases}
      />
    );
  else return <div>Loading</div>;
}

type DSABotContextType = {
  questionId: number;
  assessmentId: number;
  code: string;
  language: string;
};

export const DSABotContext = createContext<DSABotContextType | null>(null);

export const CODE_COMMENT = `# Examples to handle user input:
# 1. Single Integer Input:
#     num = int(input())
# 2. Multiple space-separated integers:
#     a, b = map(int, input().split())
# 3. List of integers:
#     import ast
#     nums = ast.literal_eval(input())
`;

export function DSATest(props: DSATestData) {
  const [isCodeEditorMaximized, setCodeEditorMaximized] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [language, setLanguage] = useState(SUPPORTED_LANGUAGES[0]);
  const [codeState, setCodeState] = useState(CodeState.IDLE);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  const [code, setCode] = useState(CODE_COMMENT);

  function handleCodeEditorChange(
    value: string | undefined,
    ev: monaco.editor.IModelContentChangedEvent
  ) {
    if (value != undefined) setCode(value);
  }

  const navigate = useNavigate();

  const handleCodeEditorMaxOrMin = () => {
    setCodeEditorMaximized((prev) => !prev);
  };

  const runSolution = async () => {
    if (editorRef.current) {
      setCodeState(CodeState.SUBMITTING);
      await DSAPracticeAPI.runSolution(
        props.questionId,
        props.assessmentId,
        "run",
        language,
        editorRef.current.getValue()
      );
      setCodeState(CodeState.RUNNING);
    }
  };

  const submitSolution = async () => {
    runSolution().then(() => {
      EvalAPI.closeAssessment(props.assessmentId);
    });
    navigate(`/dsa-practice-report?assessment_id=${props.assessmentId}`);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
          height: "90vh",
          backgroundColor: "#EFF6FF",
          zIndex: 1,
        }}
      >
        <DSABotContext.Provider
          value={{
            questionId: props.questionId,
            assessmentId: props.assessmentId,
            code: code,
            language: language,
          }}
        >
          <ChatBot
            isChatBotOpen={isChatBotOpen}
            setIsChatBotOpen={setIsChatBotOpen}
            questionId={props.questionId}
            assessmentId={props.assessmentId}
          />
        </DSABotContext.Provider>
        <PanelGroup
          className={isChatBotOpen ? "minus-z-index" : ""}
          direction="horizontal"
          style={{ height: "90vh" }}
        >
          <LeftPanel
            title={props.title}
            question={props.question}
            visible={!isCodeEditorMaximized}
            difficulty={props.difficulty}
          />
          <PanelResizeHandle
            style={{
              backgroundColor: "#EFF6FF",
              width: "40px",
            }}
          />
          <TestResultContext.Provider
            value={{
              codeState: codeState,
              setCodeState: setCodeState,
              questionId: props.questionId,
              assessmentId: props.assessmentId,
            }}
          >
            <TestCaseContext.Provider value={props.exampleTestcases}>
              <RightPanel
                editorRef={editorRef}
                language={language}
                setLanguage={setLanguage}
                isCodeEditorMaximized={isCodeEditorMaximized}
                handleCodeEditorMaxOrMin={handleCodeEditorMaxOrMin}
                isChatBotOpen={isChatBotOpen}
                runSolution={runSolution}
                codeState={codeState}
                submitSolution={submitSolution}
                code={code}
                handleCodeEditorChange={handleCodeEditorChange}
              />
            </TestCaseContext.Provider>
          </TestResultContext.Provider>
        </PanelGroup>
      </Box>
    </>
  );
}
